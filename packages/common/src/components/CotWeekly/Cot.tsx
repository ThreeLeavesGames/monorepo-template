import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  processColor,
  Alert,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import HorizontalSeperator from "./HorizontalSeperator";
import VerticalSeperator from "./VerticalSeperator";

import {
  currencyArray,
  customColors,
  themeColors,
} from "../../constants/constant";
import {
  Longs,
  LongsNormalized,
  Shorts,
  ShortsNormalized,
  changedLongs,
  changedLongsNormalized,
  changedShorts,
  changedShortsNormalized,
  date,
  max,
  min,
  getDisplayData,
  dateFormat,
} from "./cotHelper";
import useDimensions from "../../utils/dimentionUtils";
import { ICurrency } from '../EconomicIndicator';
import { split } from "../EconomicIndicator/economicHelper";
import { PlatormUtil } from "../../utils/platformUtil";

const Cot = ({ tabelData = [], cotCurrencies = [],currentPair }:{tabelData:any,cotCurrencies:any,currentPair:any}): JSX.Element => {
  const [data, setData] = React.useState([]);
  const [otherData, setOtherData] = React.useState<any>({
    Longs: [1, 2],
    Shorts: [1, 2],
    Date: [1, 2],
    [changedShorts]: [1,2],
    [changedLongs]: [1,2],
  });

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(currentPair[0]);
  const [items, setItems] = React.useState([{ label: "", value: "" }]);
  const dimentions = useDimensions();
  const platform = PlatormUtil()

  React.useEffect(()=>{
    if(typeof currentPair == 'string'){
    setValue(currentPair)
    }else{
      setValue(currentPair[0])
    }
  },[currentPair])

  React.useEffect(() => {
    setItems(
      cotCurrencies?.map((item: any) => {
        return { label: item, value: item };
      })
    );
  }, [tabelData]);

  const getColors = (index: number) => {
    switch (index) {
      case 0:
        return "#000000";
      case 1:
        return "#1f49dd";
      case 2:
        return "#f07862";
      case 3:
        return "#c8e561";
      case 4:
        return "#3cc852";
      case 5:
        return "#07b8fa";
      default:
        return "#e210e0";
    }
  };

  React.useEffect(() => {
    const { otherDataLocal, CUR } = getDisplayData(tabelData, value);
    setOtherData(otherDataLocal);
    setData(CUR);
  }, [value, tabelData]);

  function formatNumber(num: number) {
   
    if(!!num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return 'NA';
  }

  function hslToHex(h: number, s: number, l:number) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function getColor(value: number, type: string) {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return hslToHex(
      type == Longs ? 155 : 0,
      type == Longs ? 48 : 88,
      50 + 50 * (1 - value)
    );
  }

  const renderItem = ({ item, index }:{item: any, index: number}) => {
    let changedShortsPercentage =
      index + 1 >= data.length
        ? 0
        : ((data[index][changedShorts] - data[index + 1][changedShorts]) /
            Math.abs(data[index + 1][changedShorts])) *
          100;
    let changedLongsPercentage =
      index + 1 >= data.length
        ? 0
        : ((data[index][changedLongs] - data[index + 1][changedLongs]) /
            Math.abs(data[index + 1][changedLongs])) *
          100;
    return (
      <View style={styles.rowContainer}>
         <Text numberOfLines={2} style={styles.dateStyle}>
          {dateFormat(item["Date"])}
        </Text>
        <VerticalSeperator />
        <Text
          style={[
            styles.nonDateStyle,
            {
              backgroundColor: getColor(
                otherData[LongsNormalized][otherData.Longs.length - 1 - index],
                Longs
              ),
            },
          ]}
        >
          {formatNumber(item.Longs)}
        </Text>
        <VerticalSeperator />
        <Text
          style={[
            styles.nonDateStyle,
            {
              backgroundColor: getColor(
                otherData[ShortsNormalized][
                  otherData.Shorts.length - 1 - index
                ],
                Shorts
              ),
            },
          ]}
        >
          {formatNumber(item.Shorts)}
        </Text>
        <VerticalSeperator />
        <Text
          style={[
            styles.nonDateStyle,
            {
              backgroundColor: getColor(
                otherData[changedLongsNormalized][
                  otherData[changedLongs].length - 1 - index
                ],
                Longs
              ),
              fontSize: 12,
              height: "100%",
            },
          ]}
        >
          {formatNumber(item[changedLongs])}
          {"\n"}
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            {isFinite(changedLongsPercentage)?changedLongsPercentage.toFixed():'NA'}%
          </Text>
        </Text>
        <VerticalSeperator />
        <Text
          style={[
            styles.nonDateStyle,
            {
              backgroundColor: getColor(
                otherData[changedShortsNormalized][
                  otherData[changedShorts].length - 1 - index
                ],
                Shorts
              ),
              fontSize: 12,
              height: "100%",
            },
          ]}
        >
          {formatNumber(item[changedShorts])}
          {"\n"}
          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
            {isFinite(changedShortsPercentage) ?changedShortsPercentage.toFixed():'NA'}%
          </Text>
        </Text>
        <VerticalSeperator />
        <Text style={[styles.nonDateStyle, {}]}>
          {formatNumber(item[Longs] - item[Shorts])}
        </Text>
      </View>
    );
  };
const headerCurrency = typeof currentPair == 'string'?currentPair:currentPair[0]
  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={styles.container}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-evenly",marginVertical:5 }}>
        {
          <View
          style={{
            // width: dimentions.width * 0.15,
            backgroundColor: value ==headerCurrency?themeColors.green:"white",
            // height: 25,
            borderWidth:platform.isAndroid? 0.5: 0.5,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: value ==headerCurrency?themeColors.green:themeColors.blackLight,
            padding:10
          }}
        >
          <Text
          style={{color:value ==headerCurrency?themeColors.white:themeColors.blackLight,fontWeight:'bold'}}
          onPress={()=>{setValue(headerCurrency)}}>{headerCurrency}</Text>
        </View>}
        {typeof currentPair !== 'string' && <View
          style={{
            // width: dimentions.width * 0.15,
            backgroundColor: value ==currentPair[1]?themeColors.green:themeColors.white,
            // height: dimentions.height * 0.04,
            borderWidth:platform.isAndroid? 0.5: 0.1,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderColor: value ==currentPair[1]?themeColors.green:themeColors.blackLight,
            padding:10

          }}
        >
          <Text 
                    style={{color:value ==currentPair[1]?themeColors.white:themeColors.blackLight,fontWeight:'bold'}}
          onPress={()=>{setValue(currentPair[1])}}>{currentPair[1]}</Text>
        </View>}
      </View>
     
      <FlatList
        data={data}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        nestedScrollEnabled={true}
        ItemSeparatorComponent={HorizontalSeperator}
        ListHeaderComponent={(item) => {
          return (
            <View style={{ backgroundColor: themeColors.white }}>
              <View
                style={[
                  styles.rowContainer,
                  {
                    backgroundColor: customColors.lightCyan,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: 50,
                  },
                ]}
              >
                 <Text
                  numberOfLines={2}
                  style={[styles.dateStyle, { fontWeight: "bold" }]}
                >
                  Date
                </Text>
                <VerticalSeperator />
                <Text
                  style={[styles.nonDateStyleHeader, { fontWeight: "bold" }]}
                >
                  Longs
                </Text>
                <VerticalSeperator />
                <Text
                  style={[styles.nonDateStyleHeader, { fontWeight: "bold" }]}
                >
                  Shorts
                </Text>
                <VerticalSeperator />
                <Text
                  style={[styles.nonDateStyleHeader, { fontWeight: "bold" }]}
                >
                  δLongs
                </Text>
                <VerticalSeperator />
                <Text
                  style={[
                    styles.nonDateStyleHeader,
                    { fontWeight: "bold", height: undefined },
                  ]}
                >
                  δShorts
                </Text>
                <VerticalSeperator />
               
                <Text
                  style={[styles.nonDateStyleHeader, { fontWeight: "bold" }]}
                >
                  Net Positions
                </Text>
              </View>
              <HorizontalSeperator />
            </View>
          );
        }}
        keyExtractor={(item) => item.index}
      />
    </ScrollView>
  );
};

export default Cot;
export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    // padding: 5,
  },
  horizontalBorder: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "gray",
  },
  nonDateStyle: {
    width: "16%",
    textAlign: "center",
    color: "#272643",
    height: "100%",
  },
  nonDateStyleHeader: {
    width: "16%",
    textAlign: "center",
    color: "#272643",
  },
  dateStyle: {
    width: "15%",
    textAlign: "center",
    color: "#272643",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 35,
  },
  item: {
    borderRightColor: "black",
    borderRightWidth: 0.5,
  },
  title: {
    fontSize: 32,
  },
});
