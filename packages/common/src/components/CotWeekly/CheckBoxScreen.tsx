import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, FlatList, Dimensions, ViewStyle} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';



interface Iprops {
  initialValues:Object;
  style: ViewStyle;
  callBack:(val:string[])=>void;
  current: string;
  completeData: string[]
}

const CheckBoxScreen = (props: Iprops) => {
  const {initialValues=[], style,callBack,current,completeData} = props;
  const [checkValue, setCheckValue] = React.useState(initialValues);

  const renderForAndroid = (val: string) => {
    return (
      <View style={{justifyContent:'center',alignItems:'center',padding:5,width:'25%'}}>
      {/* <CheckBox
        value={checkValue.includes(val)}
        // disabled={val == current}
        tintColors={{false: '#bae8e8', true: '#2c698d'}}
        onValueChange={value => {
          if(!checkValue.includes(val) && value){
           let temp = checkValue;
           temp.push(val)
           setCheckValue([...temp])
           callBack(temp)
         }
         else if(checkValue.includes(val) && !value){
           let temp = checkValue
           const index = temp.indexOf(val);
           if (index > -1) {
            temp.splice(index, 1);
            }
           setCheckValue([...temp])
           callBack(temp)
         }
        }}
      /> */}
      <Text style={{fontSize:12,fontWeight:'bold',color:'#272643'}}>{val}</Text>
      </View>
    );
  };
  return (
    <View style={[styles.container,style]}>
      <FlatList
      data={[...completeData]}
      renderItem={({item})=>renderForAndroid(item)}
      nestedScrollEnabled={true}
      numColumns={4}
      // style={{justifyContent:'space-evenly'}}
      contentContainerStyle={{justifyContent:'space-evenly'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
export default CheckBoxScreen;
