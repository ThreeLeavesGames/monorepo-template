import React, { Component, useState } from "react";
import { View, Dimensions, StyleSheet, Text, Pressable } from "react-native";
import BookMarkSvg from "../../assets/BookMarkSvg";
import { themeColors } from "../../constants/constant";
import { Tooltip } from "../Tooltip";
// import { readUserData, tabels, writeUserData } from "../../utils/firebaseDatabase.web";
// import { useDispatch, useSelector } from "react-redux";
// import { IinitialState } from "../../redux/store";
// import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../constants/screenNames";
// import { actionType } from "../../redux/actionTypes";

interface Icurrent {
  current: string;
  currentPair: string;
}

interface IBookMarkProps {
  current: Icurrent;
}

const BookMark = ({ current }: IBookMarkProps) => {
    const [hidePopUp,setHidePopUp] = useState(false);
  // const dispatch = useDispatch()

  // const googleUserID = useSelector(
  //   (state) => state.userReducer.googleData?.googleId
  // );
// const userBookmarks:any = useSelector((state)=>state.userReducer.userBookmarks)
// const navigation = useNavigation();

  const setBookmark = (pair: string,color:'red'|'green'| 'yellow',current:string)=>{
    setHidePopUp((val)=>!val)
    // if(!!googleUserID){
    //   //TODO TEmporarily commented
    //     // writeUserData(tabels.users,googleUserID,{[pair]:{color,current}})
    //         // dispatch({type:actionType.SET_USER_BOOKMARKS,payload:{...userBookmarks,[pair]:{color,current}}})
       
    // }else{
    //   //@ts-ignore
    //     navigation.navigate(ScreenNames.loginScreen,{})
    // }
  }

  const renderBookMark = () => {
    return (
      <View style={{ flexDirection: "row",backgroundColor:themeColors.white }}>
        <Pressable onPress={() =>setBookmark(current.currentPair,'red',current.current) }>
          <BookMarkSvg fill={themeColors.red} />
        </Pressable>
        <Pressable onPress={() =>setBookmark(current.currentPair,'green',current.current) }>
          <BookMarkSvg fill={themeColors.green} />
        </Pressable>
        <Pressable onPress={() =>setBookmark(current.currentPair,'yellow',current.current) }>
          <BookMarkSvg fill={themeColors.yellow} />
        </Pressable>
      </View>
    );
  };
  const getBookmarkColor = ()=>{
    // for (let i in userBookmarks){
    // if(i == current.currentPair){
    //   //@ts-ignore
    //     return themeColors[userBookmarks[i].color]
    // }
    // }
    return themeColors.disable
  }
  return (
    <View style={styles.mainContainer}>
      <Tooltip 
      hidePopUp={hidePopUp}
      tooltipInfo={renderBookMark()}>
        <BookMarkSvg width={30} fill={getBookmarkColor()} />
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookMark;
