import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  UIManager,
  Pressable,
  Animated,
  ScrollView,
  Easing,
  Image,
} from "react-native";
import DeleteSvg from "../../assets/DeleteSvg";
import EditSvg from "../../assets/EditSvg";
import { themeColors } from "../../constants/constant";
import useDimensions from "../../utils/dimentionUtils";
import { ImagePreview } from "../ImagePreview/index.web";

const dimensions = useDimensions();

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeColors.blackLight,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    width: dimensions.width * 0.95,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    // borderWidth:0.1,
    borderRadius: 10,
    alignSelf: "center",
  },
  parentHr: {
    // height: 0,
    color: themeColors.white,
    width: "100%",
  },
  child: {
    backgroundColor: themeColors.yellow,
    padding: 16,
  },
});
enum types {
  riskReward,
  tags,
  notes,
  date,
  pair,
  session,
}

const Accordian = (props: any) => {
  const { data, ondeleteTrade, onEditTrade } = props;
  const [collapsed, setCollapsed] = useState(true);
  // const [height, setHeight] = useState(0);

  const animationHeight = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] =
    React.useState<undefined | number>(undefined);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    Animated.timing(animationHeight, {
      toValue: 0.1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    // animationHeight.addListener(({ value }) => {
    //   setHeight(value);
    // });
    if (collapsed) {
      animationHeight.setValue(0.06);
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  const maxHeight = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7000],
  });

  const renderText = ({
    LHS,
    RHS,
    type,
  }: {
    LHS: string;
    RHS: string | string[];
    type: number;
  }) => {
    const getComponent = (key: number, rhs: string[] | string) => {
      switch (key) {
        case types.tags:
          if (Array.isArray(rhs))
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width:'70%'
                }}
              >
                {rhs?.map((item) => {
                  return (
                    <Text
                      style={{
                        padding: 10,
                        paddingVertical: 5,
                        borderRadius: item.length + 20,
                        margin: 5,
                        borderWidth: 1,
                      }}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
            );
          break;
        case types.riskReward:
          if (Array.isArray(rhs))
            return (
              <View style={{ flexDirection: "row",width:'70%' }}>
                <Text>{rhs[0]}</Text>
                <Text> : </Text>
                <Text>{rhs[1]}</Text>
              </View>
            );
          break;
        case types.date:
          if(typeof rhs == 'string' )
          return <Text>{new Date(rhs).toDateString()}</Text>
          break;
        default:
          return <Text style={{
            width: "70%",
          }}>{rhs}</Text>
          break;
      }
    };

    return (
      <View style={{ flexDirection: "row", width: "100%",margin:5,paddingHorizontal:10 }}>
        <Text
          numberOfLines={2}
          style={{ fontWeight: "600", width: "30%", textAlign: "left" }}
        >
          {LHS}
        </Text>
        {getComponent(type, RHS)}
      </View>
    );
  };

  // console.log("height", height);
  return (
    <View style={{}}>
      <ImagePreview
        currentIndex={modalVisible}
        visible={modalVisible != undefined}
        onCloseModal={() => {
          setModalVisible(undefined);
        }}
        images={!!data.screenShots ? data.screenShots : []}
      />
      <Pressable
        style={[
          styles.row,
          {
            backgroundColor: data.tags.includes("win")
              ? themeColors.green
              : data.tags.includes("loss")
              ? themeColors.red
              : themeColors.disable,
          },
        ]}
        onPress={() => toggleCollapsed()}
      >
        <Text style={[styles.title]}>{props.title}</Text>
        <View
          style={{
            flexDirection: "row",
            width: 100,
            justifyContent: "space-evenly",
          }}
        >
          <Pressable
            onPress={() => {
              ondeleteTrade(data.id);
            }}
          >
            <DeleteSvg width={20} height={20} />
          </Pressable>
          <Pressable
            onPress={() => {
              onEditTrade(data.id);
            }}
          >
            <EditSvg width={20} height={20} />
          </Pressable>
        </View>
      </Pressable>
      <Animated.View
        style={{
          maxHeight: maxHeight,
          backgroundColor: "white",
          width: dimensions.width * 0.95,
          alignSelf: "center",
          borderRadius: 10,
        }}
      >
        <ScrollView
          style={{
            // padding: height == 0 ? 0 : 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          {renderText({ LHS: "Pair:", RHS: data.currency, type: types.pair })}
          {renderText({
            LHS: "Risk:Reward",
            RHS: data.riskReward,
            type: types.riskReward,
          })}
          {renderText({ LHS: "Tags:", RHS: data.tags, type: types.tags })}
          {renderText({
            LHS: "notes:",
            RHS: `${data.notes}`,
            type: types.notes,
          })}
          {renderText({
            LHS: "session:",
            RHS: data.session,
            type: types.session,
          })}
          {renderText({ LHS: "Date:", RHS: data.date, type: types.date })}
          {/* {renderText({ LHS: "Position Size", RHS: "0.66" })} */}
          {!!data.screenShots &&
            data?.screenShots?.map((item: string, index: number) => {
              return (
                <Pressable
                  onPress={() => {
                    setModalVisible(index);
                  }}
                >
                  <Image
                    //@ts-ignore
                    source={{ uri: item?.uri }}
                    style={{
                      height: 250,
                      width: "100%",
                      marginVertical: 10,
                    }}
                  />
                </Pressable>
              );
            })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Accordian;
