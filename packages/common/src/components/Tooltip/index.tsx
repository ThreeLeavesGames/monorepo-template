import React, { Component, FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  // Dimensions,
  I18nManager,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
// import { useTheme } from 'styled-components/native';
import { themeColors } from '../../constants/constant';
import useDimensions from '../../utils/dimentionUtils';
import { PlatormUtil } from '../../utils/platformUtil';
import { GetElementVisibleWidth } from './TooltipCoordinate';
import { TooltipStyles } from './TooltipStyles';
import Triangle from './Triangle';

interface ITooltipProps {
  ModalComponent?: typeof Component;
  backgroundColor?: string;
  children: ReactElement | null;
  containerStyle?: StyleProp<ViewStyle>;
  height?: number;
  isDismiss?: boolean;
  isShowLocationInfo?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  pointerColor?: string;
  pointerStyle?: StyleProp<ViewStyle>;
  skipAndroidStatusBar?: boolean;
  toggleAction?: string | 'onPress' | 'onLongPress';
  toggleOnPress?: boolean;
  tooltipInfo: ReactElement | null;
  width?: number;
  withPointer?: boolean;
  hidePopUp?:boolean
}

export const Tooltip: FC<ITooltipProps> = (props: ITooltipProps): ReactElement => {
  // const theme = useTheme() a;
  const usedimensions = useDimensions();
  const ScreenWidth = usedimensions.width;
  const {
    children,
    tooltipInfo,
    withPointer = true,
    toggleOnPress = true,
    toggleAction = 'onPress',
    height = 76,
    width = 192,
    containerStyle = {},
    backgroundColor = themeColors.disable,
    pointerColor = backgroundColor,
    pointerStyle,
    onClose = () => {},
    onOpen = () => {},
    skipAndroidStatusBar = false,
    ModalComponent = Modal,
    isDismiss = false,
    isShowLocationInfo,
    hidePopUp
  } = props;

  const [visible, setVisible] = useState(false);
  const isMounted = useRef(false);
  const renderedElement = useRef<View>(null);
  const customHeight = 0.0625 * usedimensions.height;

  const [dimensions, setDimensions] = useState({
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  });

  useEffect(()=>{
    handleOnPress()
  },[hidePopUp])

  const getElementPosition = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    renderedElement.current &&
      renderedElement.current.measure((_frameOffsetX, _frameOffsetY, _width, _height, pageOffsetX, pageOffsetY) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isMounted.current &&
          setDimensions({
            xOffset: pageOffsetX,
            yOffset:
              PlatormUtil().isIOS || skipAndroidStatusBar
                ? pageOffsetY
                : pageOffsetY -
                  Platform.select({
                    android: StatusBar.currentHeight,
                    ios: 20,
                    default: 0,
                  }),
            elementWidth: _width,
            elementHeight: _height,
          });
      });
  }, [skipAndroidStatusBar]);

  const handleOnPress = useCallback(() => {
    getElementPosition();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMounted.current && toggleOnPress && (visible ? setVisible(false) : setVisible(true));
  }, [getElementPosition, onClose, onOpen, toggleOnPress, visible,hidePopUp]);

  const Pointer: FC<{
    tooltipY: number | string;
  }> = ({ tooltipY }) => {
    const { yOffset, xOffset, elementHeight, elementWidth } = dimensions;
    const pastMiddleLine = yOffset > (tooltipY || 0);
    if (!withPointer) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine
            ? yOffset - 13 + (PlatormUtil().isAndroid ? +customHeight : 0)
            : yOffset + elementHeight - 2 + (PlatormUtil().isAndroid ? +customHeight : 0),
          [I18nManager.isRTL ? 'right' : 'left']:
            xOffset + GetElementVisibleWidth(elementWidth, xOffset, ScreenWidth) / 2 - 7.5,
        }}
      >
        <Triangle style={pointerStyle} pointerColor={pointerColor} isDown={pastMiddleLine} />
      </View>
    );
  };

  useEffect(() => {
    isMounted.current = true;
    requestAnimationFrame(getElementPosition);
    Dimensions.addEventListener('change', getElementPosition);
    return () => {
      isMounted.current = false;
    };
  }, [getElementPosition]);

  useEffect(() => {
    if (isDismiss) {
      setVisible(false);
    }
    if (onClose) {
      onClose();
    }
  }, [onClose, isDismiss]);

  useEffect(() => {
    if (onOpen && visible) onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (isShowLocationInfo) {
      setTimeout(() => {
        handleOnPress();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowLocationInfo]);

  /**
   * Calculate position of tooltip
   */
  const tooltipStyle = useMemo(
    () =>
      TooltipStyles({
        ...dimensions,
        backgroundColor,
        containerStyle,
        height,
        width,
        withPointer,
      }),
    [backgroundColor, containerStyle, dimensions, height, width, withPointer]
  );

  return (
    <View collapsable={false}  ref={renderedElement}>
      <Pressable {...{ [toggleAction]: handleOnPress }} delayLongPress={250}>
        {children}
      </Pressable>
      <ModalComponent transparent visible={visible} onShow={onOpen} animationType="fade">
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            flex: 1,
          }}
          onPress={handleOnPress}
          activeOpacity={1}
        >
          <View>
            <Pointer tooltipY={tooltipStyle.top || 0} />
            <View
              style={[
                tooltipStyle,
                {
                  top: Number(tooltipStyle.top) + (PlatormUtil().isAndroid ? +customHeight : 0),
                  backgroundColor:themeColors.white,
                  borderWidth:0.1,
                  borderColor:themeColors.blackLight
                },
              ]}
            >
              {tooltipInfo}
            </View>
          </View>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};
