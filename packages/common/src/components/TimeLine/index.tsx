import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  LayoutAnimation,
  Animated,
  ViewStyle,
  TextStyle,
  LayoutAnimationConfig,
  Dimensions,
  UIManager,
} from "react-native";
import { customColors, themeColors } from "../../constants/constant";
import { PlatormUtil } from "../../utils/platformUtil";
import { Circle } from "./Circle";
const { width } = Dimensions.get("window");

export interface ITimeLineData {
  title: string;
  children: ReactNode;
}

const TimeLine = (props: {
  current: number;
  steps: number;
  type: string;
  onStepPress: (val: number) => void;
  data: ITimeLineData[];
  noTimeline: boolean;
}) => {
  const { current, steps, type, onStepPress } = props;
  const styles = getStyles();

  let currentStepCircle = new Animated.Value(1);
  const [data, setData] = useState(props.data);
  const [x, setX] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (PlatormUtil().isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    const CustomLayoutLinear = {
      duration: 1000,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
    };
    LayoutAnimation.configureNext(CustomLayoutLinear);
  }, [current]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ITimeLineData;
    index: number;
  }) => {
    if(props.noTimeline){
      return <View style={{justifyContent:'flex-start'}}>{item.children}</View>
    }else{
      return (
        <View style={[styles.renderItemContainer]} key={index}>
          {renderEvent(item, index)}
          {renderCircle(item, index)}
        </View>
      );
    }

  };

  const renderEvent = (rowData: ITimeLineData, rowID: number) => {
    const { current, steps, type, onStepPress } = props;

    const isLast = data.slice(-1)[0] === rowData;
    let backgroundColor = themeColors.disable;

    if (current - 1 >= rowID) {
      backgroundColor = customColors.Keppel;
    } else if (isLast) {
      backgroundColor = "transparent";
    }
    const styles = getStyles(rowID, steps, backgroundColor, current);

    return (
      <View
        key={rowID}
        style={[styles.eventContainer]}
        onLayout={(evt) => {
          if (!x && !width) {
            setX(evt.nativeEvent.layout.x);
            setWidth(evt.nativeEvent.layout.width);
          }
        }}
      >
        <View style={styles.titleConatiner}>
          <View style={{  width: "97%",bottom:4 }}>
            {
              //@ts-ignore
              <Text style={[styles.title,{bottom:10}]} onPress={() => onStepPress(rowID)}>
                {rowData.title}
              </Text>
            }
          {current === rowID && renderDetail(rowData, rowID)}
          </View>
          {/* <View style={styles.detailConatiner} /> */}
        </View>
      </View>
    );
  };

  const renderDetail = (rowData: ITimeLineData, rowID: number) => {
    return rowData.children
  };

  const renderCircle = (rowData: ITimeLineData, rowID: number) => {
    const { current } = props;
    let backgroundColor = themeColors.blackLight;
    if (current - 1 >= rowID) {
      backgroundColor = customColors.Keppel;
      return (
        <Circle
          backgroundColor={backgroundColor}
          current={current}
          rowID={rowID}
          isIcon
        />
      );
    }
    if (current === rowID) {
      backgroundColor = "rgba(23, 161, 251,0.5)";
    }
    return (
      <Circle
        backgroundColor={backgroundColor}
        current={current}
        isIcon={false}
        rowID={rowID}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
          extraData={props}
        style={styles.flatListStyle}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      />
    </View>
  );
};

export default TimeLine;

const getStyles = (
  rowID?: number,
  steps?: number,
  backgroundColor?: string,
  current?: number
) => {
  return StyleSheet.create({
    container: {
      width: width * 0.95,
      justifyContent: "center",
      alignSelf: "center",
    },
    flatListStyle: { paddingLeft: 1 },
    renderItemContainer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    eventContainer: {
      flexDirection: "column",
      flex: 1,
      borderColor: backgroundColor,
      borderLeftWidth: 1,
      borderRightWidth: 0,
      marginLeft: 20,
      paddingLeft: 20,
      marginTop: 5,
    },
    titleConatiner: {
      paddingTop: 15,
      paddingBottom: 10,
      bottom: 13,
      flex: 0,
    },
    title: {
      fontWeight: rowID === current ? "bold" : "500",
      fontSize: rowID === current ? 16 : 14,
      //@ts-ignore
      color:rowID < current ? customColors.Keppel : rowID > current ? themeColors.blackLight : customColors.peterRiver,
    },
    detailConatiner: { height: 10 },
  });
};
