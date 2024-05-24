import React from 'react'
import { View,Text,StyleSheet } from 'react-native';
import {BarChart } from "react-native-chart-kit"
import { chartConfig, themeColors } from '../../constants/constant';
import useDimensions from '../../utils/dimentionUtils';


export const CustomBarChart = (props: any) =>{
    const {data} = props
    const dimentions = useDimensions();
    const styles = getStyles();
    return(
        <View style={styles.container}>
          <Text style={styles.header}>Retail sentiment</Text>
         { //@ts-ignore
          <BarChart
            data={data}
            width={dimentions.width * 0.49}
            height={dimentions.height * 0.23}
            yAxisLabel=""
            yAxisSuffix="%"
            chartConfig={chartConfig}
            fromZero
            showBarTops={false}
            style={{marginBottom:10 }}
            segments={3}
            withInnerLines={false}
            flatColor
            withHorizontalLabels={true}
            showValuesOnTopOfBars={true}
            withCustomBarColorFromData={true}
          />}
          </View>
    )
}

const  getStyles = () =>{
  return StyleSheet.create({
    container:{
      borderWidth: 0.5,
      borderColor:themeColors.blackLight
    },
    header:{fontFamily:'Roboto',alignSelf:'center'}
  })
}