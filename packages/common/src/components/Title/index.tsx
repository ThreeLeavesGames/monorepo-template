import React from 'react'
import { Text, View } from "react-native";
import { themeColors } from "../../constants/constant";
import useDimensions from "../../utils/dimentionUtils";

export const Title = (props:{title:string}) => {
    const dimentions = useDimensions();
    return (
      <View
        style={{
          height: dimentions.height * 0.03,
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: themeColors.disable,
          marginTop:20
        }}
      >
        <Text
          style={{
            paddingHorizontal: 20,
            fontWeight: "bold",
            color: themeColors.blackLight,
          }}
        >
          {props.title}
        </Text>
      </View>
    );
  };