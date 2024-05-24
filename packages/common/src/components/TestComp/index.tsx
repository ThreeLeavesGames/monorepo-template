import React, { FC, ReactElement, useState } from "react";
import { View, TextInput, ViewStyle } from "react-native";

const TestComp = ({ placeholder, onChangeText, style,value }:{placeholder: string,onChangeText?: (val: string)=>void,style:ViewStyle,value: string}) => {
  const [height, setHeight] = useState(42);
  return (
    <View
      style={{
      }}
    >
      <TextInput
        style={{ textAlignVertical: "top", height: height,
        padding: 5,
        borderWidth: 0.5,
        borderColor: "black",
        borderRadius: 10,
        minHeight: 100,
        minWidth: 300
    }}
    value={value}
        multiline={true}
        numberOfLines={10}
        placeholder={placeholder}
        onChangeText={onChangeText}
        allowFontScaling={false}
        testID={"text-area"}
        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
      />
    </View>
  );
};

export default TestComp;
