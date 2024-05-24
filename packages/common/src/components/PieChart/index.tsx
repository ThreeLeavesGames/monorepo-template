import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { chartConfig } from "../../constants/constant";
import useDimensions from "../../utils/dimentionUtils";
import { themeColors, customColors } from "../../constants/constant";
import { Longs, Shorts } from "../CotWeekly/cotHelper";
import LeftArrow from "../../assets/LeftArrow";
import RightArrow from "../../assets/RightArrow";
import RefreshingComponent from "../RefreshingComponent";
import {PlatormUtil} from "../../utils/platformUtil";

// const 

const RenderLegend = (props: { color?: string; value: string }) => {
  const { color = "red", value = "sell" } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 15,
          height: 15,
          backgroundColor: color,
          // borderRadius: 10,
          marginRight: 50,
        }}
      ></View>
      <Text>{value}</Text>
    </View>
  );
};
export interface IcotNetPositions {
  currency: string;
  long: string;
  short: string;
  date:string;
}

export const CustomPieChart = (props: { data: IcotNetPositions[],rightMovement?:()=>void,leftMovement?:()=>void,containerStyle:ViewStyle }) => {
  const { data = [],leftMovement,rightMovement ,containerStyle} = props;
  const dimentions = useDimensions();

  const getSingleChartData = (data: IcotNetPositions)=>{
    return [
      {
        position: Number(data.short),
        color: themeColors.red,
      },
      {
        position: Number(data.long),
        color: themeColors.green,
      },
    ];
  }
  const getChartData = (value: IcotNetPositions[], type: string) => {
    if (type == Longs) {
      return [
        {
          position: Number(isdata ? value[0].long : 10),
          color: customColors.peterRiver,
        },
        {
          position: Number(isdata ? value[1].long : 90),
          color: customColors.Jonquil,
        },
      ];
    }
    return [
      {
        position: Number(isdata ? value[0].short : 10),
        color: customColors.peterRiver,
      },
      {
        position: Number(isdata ? value[1].short : 90),
        color: customColors.Jonquil,
      },
    ];
  };
  const isdata = !!data && data.length > 0;
  if(!isdata){
    return(
      <RefreshingComponent/>
    )
  }
  if(data.length == 1){
    return(
      <View style={{justifyContent:'center',alignItems:'center',...containerStyle}}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderColor: themeColors.blackLight,
            alignSelf: "center",
            justifyContent:!!leftMovement? "space-between":'center',
            alignItems: "center",
          }}
        >
         {!!leftMovement &&  <TouchableOpacity 
          onPress={!!leftMovement && leftMovement}
          >
            <LeftArrow width={20} height={20} />
          </TouchableOpacity>}
          <View>
          <Text style={{textAlign:'center'}}>{isdata? data[0].date: ''}</Text>
      <Text style={{ fontWeight:'500' }}>COT Net Positions</Text>
      </View>
          {!!rightMovement && <TouchableOpacity onPress={!!rightMovement && rightMovement}>
            <RightArrow width={20} height={20} />
          </TouchableOpacity>}
        </View>
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>{data[0].currency}</Text>
           {//@ts-ignore
          <PieChart
            data={getSingleChartData(data[0])}
            width={dimentions.width * 0.5}
            height={dimentions.height * 0.2}
            chartConfig={chartConfig}
            accessor={"position"}
            backgroundColor={"transparent"}
            paddingLeft={"50"}
            hasLegend={false}
            xAxisLabel={"x"}
          />}
        </View>
    )
  }
  return (
    <View style={{ justifyContent: "center", alignItems: "center" ,...containerStyle}}>
      {!!leftMovement && <>
       <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderColor: themeColors.blackLight,
            alignSelf: "center",
            justifyContent:!!leftMovement? "space-between":'center',
            alignItems: "center",
          }}
        >
         {!!leftMovement &&  <TouchableOpacity 
          onPress={!!leftMovement && leftMovement}
          >
            <LeftArrow width={20} height={20} />
          </TouchableOpacity>}
          <View>
          <Text>{isdata? data[0].date: ''}</Text>
      <Text style={{ fontWeight:'500' }}>COT Net Positions</Text>
      </View>
          {!!rightMovement && <TouchableOpacity onPress={!!rightMovement && rightMovement}>
            <RightArrow width={20} height={20} />
          </TouchableOpacity>}
        </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>Longs</Text>
           {//@ts-ignore
          <PieChart
            data={getChartData(data, Longs)}
            width={dimentions.width * 0.25}
            height={dimentions.height * 0.1}
            chartConfig={chartConfig}
            accessor={"position"}
            backgroundColor={"transparent"}
            paddingLeft={"27"}
            hasLegend={false}
            xAxisLabel={"x"}
          />}
        </View>
        <View>
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
            Shorts
          </Text>
          {//@ts-ignore
            <PieChart
            data={getChartData(data, Shorts)}
            width={dimentions.width * 0.25}
            height={dimentions.height * 0.1}
            chartConfig={chartConfig}
            accessor={"position"}
            backgroundColor={"transparent"}
            paddingLeft={"27"}
            hasLegend={false}
            xAxisLabel={"x"}
          />}
        </View>
      </View>
      <RenderLegend
        value={isdata ? data[1].currency : "USD"}
        color={customColors.Jonquil}
      />
      <RenderLegend
        value={isdata ? data[0].currency : "EUR"}
        color={customColors.peterRiver}
      />
</>}
      <View
        style={{
          width: useDimensions().width*0.5,
          borderWidth:PlatormUtil().isAndroid?1: 0.1,
          borderColor: themeColors.blackLight,
          marginTop: 10,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderBottomWidth:PlatormUtil().isAndroid?1: 0.1,
            borderColor: themeColors.blackLight,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            // paddingVertical:10
          }}
        >
          <Text style={{ width: "30%", fontWeight: "bold", fontSize: 13 }}>
            Currency
          </Text>
          <Text style={{ width: "30%", fontWeight: "bold", fontSize: 13 }}>
            Long
          </Text>
          <Text style={{ width: "30%", fontWeight: "bold", fontSize: 13 }}>
            short
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ width: "30%" }}>{isdata ? data[0].currency : ""}</Text>
          <Text style={{ width: "30%" }}>{isdata ? data[0].long : ""}%</Text>
          <Text style={{ width: "30%" }}>{isdata ? data[0].short : ""}%</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",

            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ width: "30%" }}>{isdata ? data[1].currency : ""}</Text>
          <Text style={{ width: "30%" }}>{isdata ? data[1].long : ""}%</Text>
          <Text style={{ width: "30%" }}>{isdata ? data[1].short : ""}%</Text>
        </View>
      </View>
    </View>
  );
};
