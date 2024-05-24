import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { themeColors } from "../../constants/constant";

interface Itags {name: string, isSelected : boolean,bgColor: string, color: string}

function Tags({data,callBack,selectedData}:{data:Itags[],callBack:(val: any)=>void,selectedData: string[]}) {
  const [tags, setTags] = useState(data);

  useEffect(()=>{
if(!!selectedData){
  const updated = data?.map((item)=>{
    return {
      ...item,
      isSelected: selectedData.includes(item.name)
    }
  })
  setTags(updated)
}
  },[])

  const updateTags = (tag:Itags) => {
    const res = tags?.map((item: Itags) => {
      if (item.name == tag.name) {
        return {
          ...item,
          isSelected: !tag.isSelected
        };
      }
      return item;
    });
    setTags(res);
    callBack(res)
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {tags?.map((item) => {
          return (
            <Text
              onPress={() => {
                updateTags(item);
              }}
              style={{
                padding: 10,
                paddingVertical: 5,
                backgroundColor: item.isSelected ? themeColors.blackLight : themeColors.white,
                color: item.isSelected ? themeColors.white : themeColors.blackLight,
                borderRadius: item.name.length + 20,
                margin: 5,
                ...(item.isSelected && {fontWeight:'bold'}),
                ...(!item.isSelected && {borderWidth:1,borderColor:themeColors.blackLight})
              }}
            >
              {item.name}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default Tags;
