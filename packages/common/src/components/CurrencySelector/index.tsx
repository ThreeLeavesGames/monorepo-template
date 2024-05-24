'use client'
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { customColors, themeColors } from "../../constants/constant";
import { PlatormUtil } from "../../utils/platformUtil";
import { ICurrency } from "../EconomicIndicator";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CurrencySelector(props: {
  curreny: string[];
  currenyPair: string[];
  onCallback: (val: ICurrency) => void;
  parentCurrent: ICurrency;
}) {

  console.log({props})
  const { curreny, currenyPair, onCallback, parentCurrent } = props;
  const [current, setCurrent] = useState(parentCurrent?.current);
  const [currentPair, setCurrentPair] = useState(parentCurrent?.currentPair);
  //const platform = PlatormUtil();
  useEffect(() => {
    setCurrent(parentCurrent?.current);
    setCurrentPair(parentCurrent?.currentPair);
  }, [parentCurrent]);
  return (
    <View
      style={{
        // ...(platform.isAndroid && { maxHeight: width * 0.4 }),
        backgroundColor: customColors.Black,
        width: width,
        display:'flex',
        flexDirection:'column',
        flex:1
      }}
    >
        <ScrollView horizontal contentContainerStyle={{display:'flex',width:'100%'}}>
          {curreny?.map((item) => {
            return (
              <View
                key={item}
                style={{
                  padding: 10,
                  backgroundColor:
                    item == current ? themeColors.green : themeColors.disable,
                  margin: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  onPress={() => {
                    setCurrent(item);
                  }}
                  style={{ fontWeight: "bold", color: themeColors.blackLight }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </ScrollView>

      <View
        style={{
          height: 1,
          backgroundColor: themeColors.disable,
          marginVertical: 10,
        }}
      ></View>

    
        <View
          style={{
            flexDirection: "row",
            display:'flex',
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            // width:width
          }}
        >
          {currenyPair
            .filter((cur) => cur.includes(current))
            ?.map((item) => {
              return (
                <View
                  key={item}
                  style={{
                    backgroundColor:
                      item == currentPair
                        ? themeColors.green
                        : themeColors.yellow,
                    margin: 5,
                    borderRadius: 3,
                    padding: 5,
                  }}
                >
                  <Text
                    onPress={() => {
                      setCurrentPair(item);
                      onCallback({ current, currentPair: item });
                    }}
                    style={{ fontSize: 13, color: themeColors.blackLight }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
        </View>
    </View>
  );
}

