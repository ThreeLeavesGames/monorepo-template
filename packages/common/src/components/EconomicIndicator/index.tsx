import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
// @ts-ignore
import cheerio from "../cheerio";
import { Dimensions } from "react-native";
import GenericHeader from "../GenericHeader";
import { split } from "./economicHelper";
import { themeColors } from "../../constants/constant";
import { PlatormUtil } from "../../utils/platformUtil";
import RefreshingComponent from "../RefreshingComponent";
const DeviceWidth = Dimensions.get("window").width;
//  const countries = ['united-states','euro-area','japan','united-kingdom','india','canada','australia','mexico','new-zealand','switzerland']

const country = {
  USD: "united-states",
  EUR: "euro-area",
  JPY: "japan",
  GBP: "united-kingdom",
  CAD: "canada",
  AUD: "australia",
  MXN: "mexico",
  NZD: "new-zealand",
  CHF: "switzerland",
  RUB:"russia",
  ZAR:"south-africa"
};

interface IData {
  country: string;
  gdp: number[] | string[];
  inflation: number[] | string[];
  interest: number[] | string[];
  unemployment: number[] | string[];
}
export interface ICurrency {
  current: string;
  currentPair: string;
}

const EconomicIndicator = ({ data }: { data: ICurrency }) => {
  // return(
  //   <View>jc</View>
  // )
  const [economicData, setEconomicData] = useState<IData[]>([]);
  const [currencyData, setCurrenyData] = useState(data);
  const [isRefreshing, setRefreshing] = useState(true);

  const platform = PlatormUtil();

  React.useEffect(() => {
    fetchWebPage();
  }, [currencyData]);

  React.useEffect(() => {
    setCurrenyData(data);
  }, [data]);

  const getCountry = (): string[] => {
    return split(currencyData.currentPair, 3).map((item: string) => {
      //@ts-ignore
      return country[item];
    });
  };

  const getColor = (val1: number, val2: number) => {
    if (val1 > val2) {
      return [ themeColors.green, themeColors.red];
    } else if (val2 > val1) {
      return [themeColors.red,themeColors.green];
    }
    return [themeColors.blackLight, themeColors.blackLight];
  };
  const herokuCorsApp = 'https://cors-anywhere.herokuapp.com'
//https://thawing-springs-94926.herokuapp.com
  const fetchWebPage = () => {
    setRefreshing(true)
  
    const result = getCountry().map((country) => {
      const url = platform.isAndroid
        ? `https://tradingeconomics.com/${country}/indicators`
        : `${herokuCorsApp}/https://tradingeconomics.com/${country}/indicators`;

      //https://stackoverflow.com/questions/47076743/cors-anywhere-herokuapp-com-not-working-503-what-else-can-i-try
      return fetch(url).then(async (res) => {
        const text = await res.text();

        let $ = cheerio.load(text);
        // let gdp = $(`a[href="/${country}/gdp-growth"]`).html();
        // let intrest = $(`a[href="/${country}/interest-rate"]`).html();
        // let inflation = $(`a[href="/${country}/inflation-cpi"]`).html();
        // let unemployment = $(`a[href="/${country}/unemployment-rate"]`).html();
        let gdp = $(`a[href='/${country}/gdp-growth']`)
          .parent()
          .siblings()
          .contents()
          .slice(0, 3)
          .toArray();
        const gdpResult = gdp.map((child: any) => {
          if (child.hasOwnProperty("data")) {
            return child.data;
          } else {
            return child.children.map((baby: any) => {
              return baby.data;
            })[0];
          }
        });
        let unemployment = $(`a[href='/${country}/unemployment-rate']`)
          .parent()
          .siblings()
          .contents()
          .slice(0, 3)
          .toArray();
        const unemploymentResult = unemployment.map((child: any) => {
          if (child.hasOwnProperty("data")) {
            return child.data;
          } else {
            return child.children.map((baby: any) => {
              return baby.data;
            })[0];
          }
        });

        let inflation = $(`a[href='/${country}/inflation-cpi']`)
          .parent()
          .siblings()
          .contents()
          .slice(0, 3)
          .toArray();
        const inflationResult = inflation.map((child: any) => {
          if (child.hasOwnProperty("data")) {
            return child.data;
          } else {
            return child.children.map((baby: any) => {
              return baby.data;
            })[0];
          }
        });
        let interestRate = $(`a[href='/${country}/interest-rate']`)
          .parent()
          .siblings()
          .contents()
          .slice(0, 3)
          .toArray();
        const interestRateResult = interestRate.map((child: any) => {
          if (child.hasOwnProperty("data")) {
            return child.data;
          } else {
            return child.children.map((baby: any) => {
              return baby.data;
            })[0];
          }
        });
        return {
          country,
          gdp: gdpResult,
          inflation: inflationResult,
          interest: interestRateResult,
          unemployment: unemploymentResult,
        };

       
      });
    });
    try {
      Promise.all(result).then((res) => {
        setEconomicData(res);
         setRefreshing(false)
      });
    } catch (error) {
      setRefreshing(false)
    }
  };
  if(isRefreshing){
    return (
    <RefreshingComponent/>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        // height:'50%'
      }}
    >
      <FlatList
        data={economicData}
        // refreshing={isRefreshing}
        //   onRefresh={()=>{
        // fetchWebPage()
        //   }}
        contentContainerStyle={{ justifyContent: "flex-start" }}
        renderItem={({ item }: { item: IData }) => {
          const width = DeviceWidth / 2.5;
          if (item.country == economicData[0].country) {
            return null;
          }
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                width: DeviceWidth * 0.9,
                borderWidth: 0.5,
                borderColor: themeColors.blackLight,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: 1,
                }}
              >
                <Text style={styles.textLeft}>Country</Text>
                <Text
                  style={[
                    styles.textMiddle,
                    { width: "40%", borderBottomWidth: 0.5 },
                  ]}
                >
                  {item.country}
                </Text>
                <Text
                  style={[
                    styles.textMiddle,
                    { width: "40%", borderBottomWidth: 0.5,
                    borderLeftWidth:0.1,
                    borderColor:themeColors.blackLight
                  },
                  ]}
                >
                  {economicData[0].country}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  borderBottomWidth: 0.5,
                  marginBottom: 1,
                  borderColor: themeColors.blackLight,
                }}
              >
                <Text style={styles.textLeft}></Text>
                <Text style={styles.textMiddle}>Last</Text>
                <Text style={styles.textRight}>Previous</Text>
                <Text style={[styles.textMiddle,{
                  borderLeftWidth:0.1,
                  borderColor:themeColors.blackLight
                }]}>Last</Text>
                <Text style={styles.textRight}>Previous</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.textLeft}>GDP</Text>
                <Text
                  style={[
                    styles.textMiddle,
                    {
                      backgroundColor: getColor(
                        Number(item.gdp[0]),
                        Number(item.gdp[1])
                      )[0],
                    },
                  ]}
                >
                  {item.gdp[0]}
                </Text>
                <Text style={[styles.textRight,
                 {
                  backgroundColor: getColor(
                    Number(item.gdp[0]),
                    Number(item.gdp[1])
                  )[1],
                },
                ]}>{item.gdp[1]}</Text>
                <Text style={[styles.textMiddle,
                 {
                  backgroundColor: getColor(
                    Number(economicData[0].gdp[0]),
                    Number(economicData[0].gdp[1])
                  )[0],
                  borderLeftWidth:0.1,
                  borderColor:themeColors.blackLight
                },
                ]}>{economicData[0].gdp[0]}</Text>
                <Text style={[styles.textRight,
                 {
                  backgroundColor: getColor(
                    Number(economicData[0].gdp[0]),
                    Number(economicData[0].gdp[1])
                  )[1],
                },
                ]}>{economicData[0].gdp[1]}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.textLeft}>Inflation</Text>
                <Text style={[styles.textMiddle,{
                   backgroundColor: getColor(
                    Number(item.inflation[0]),
                    Number(item.inflation[1])
                  )[0],
                }]}>{item.inflation[0]}</Text>
                <Text style={[styles.textRight,{
                  backgroundColor: getColor(
                    Number(item.inflation[0]),
                    Number(item.inflation[1])
                  )[1],
                }]}>{item.inflation[1]}</Text>
                <Text style={[styles.textMiddle,{
                  borderLeftWidth:0.1,
                  borderColor:themeColors.blackLight,
                  backgroundColor: getColor(
                    Number(economicData[0].inflation[0]),
                    Number(economicData[0].inflation[1])
                  )[0],
                }]}>
                  {economicData[0].inflation[0]}
                </Text>
                <Text style={[styles.textRight,{
                   backgroundColor: getColor(
                    Number(economicData[0].inflation[0]),
                    Number(economicData[0].inflation[1])
                  )[1],
                }]}>
                  {economicData[0].inflation[1]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.textLeft}>unemployment</Text>
                <Text style={[styles.textMiddle,{
                   backgroundColor: getColor(
                    Number(item.unemployment[0]),
                    Number(item.unemployment[1])
                  )[1],
                  textAlignVertical:'center',
                  paddingTop:5,
                }]}>{item.unemployment[0]}</Text>
                <Text style={[styles.textRight,{
                   backgroundColor: getColor(
                    Number(item.unemployment[0]),
                    Number(item.unemployment[1])
                  )[0],
                  paddingTop:5,
                }]}>{item.unemployment[1]}</Text>
                <Text style={[styles.textMiddle,{
                  borderLeftWidth:0.1,
                  borderColor:themeColors.blackLight,
                  backgroundColor: getColor(
                    Number(economicData[0].unemployment[0]),
                    Number(economicData[0].unemployment[1])
                  )[1],
                  paddingTop:5,
                }]}>
                  {economicData[0].unemployment[0]}
                </Text>
                <Text style={[styles.textRight,{
                  backgroundColor: getColor(
                    Number(economicData[0].unemployment[0]),
                    Number(economicData[0].unemployment[1])
                  )[0],
                  paddingTop:5,
                }]}>
                  {economicData[0].unemployment[1]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.textLeft}>Interest Rate</Text>
                <Text style={[styles.textMiddle,{
                  backgroundColor: getColor(
                    Number(item.interest[0]),
                    Number(item.interest[1])
                  )[0],
                }]}>{item.interest[0]}</Text>
                <Text style={[styles.textRight,{
                     backgroundColor: getColor(
                      Number(item.interest[0]),
                      Number(item.interest[1])
                    )[1],
                }]}>{item.interest[1]}</Text>
                <Text style={[styles.textMiddle,{
                  borderLeftWidth:0.1,
                  borderColor:themeColors.blackLight,
                  backgroundColor: getColor(
                    Number(economicData[0].interest[0]),
                    Number(economicData[0].interest[1])
                  )[0],
                }]}>
                  {economicData[0].interest[0]}
                </Text>
                <Text style={[styles.textRight,{
                   backgroundColor: getColor(
                    Number(economicData[0].interest[0]),
                    Number(economicData[0].interest[1])
                  )[1],
                }]}>
                  {economicData[0].interest[1]}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default EconomicIndicator;

const styles = StyleSheet.create({
  textLeft: {
    width: "20%",
    textAlign: "center",
    borderRightWidth: 0.5,
    fontWeight: "bold",
    fontSize: 12,
    borderColor: themeColors.blackLight,
  },
  textMiddle: {
    width: "20%",
    textAlign: "center",
    borderColor: themeColors.blackLight,
    color:'black',
    fontWeight:"bold"
  },
  textRight: {
    width: "20%",
    textAlign: "center",
    borderColor: themeColors.blackLight,
    fontWeight:"bold"

  },
});
