import { I18nManager, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import useDimensions from '../../utils/dimentionUtils';
import { TooltipCoordinate } from './TooltipCoordinate';

interface ITooltipStyle {
  backgroundColor: string;
  containerStyle: StyleProp<ViewStyle>;
  elementHeight: number;
  elementWidth: number;
  height: number;
  width: number;
  withPointer: boolean;
  xOffset: number;
  yOffset: number;
}

export const TooltipStyles = (props: ITooltipStyle): ViewStyle => {
  const { yOffset, xOffset, elementHeight, elementWidth, width, height, withPointer, backgroundColor, containerStyle } =
    props;
  const ScreenWidth = useDimensions().width;
  const ScreenHeight = useDimensions().height;
  const { x, y } = TooltipCoordinate(
    xOffset,
    yOffset,
    elementWidth,
    elementHeight,
    ScreenWidth,
    ScreenHeight,
    width,
    height,
    withPointer
  );
  return StyleSheet.flatten([
    {
      position: 'absolute',
      [I18nManager.isRTL ? 'right' : 'left']: x,
      top: y,
      width,
      height,
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius: 10,
      padding: 10,
    },
    containerStyle,
  ]);
};
