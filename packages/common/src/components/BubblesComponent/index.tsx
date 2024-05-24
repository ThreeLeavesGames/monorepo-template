import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as d3 from 'd3';
import { themeColors } from "../../constants/constant";
import { handleOtherCurrencies } from "../../screens/Homepage/index.web";
// import Svg, {
//   Circle,
//   G,
//   Text as SVGText,
// } from 'react-native-svg-web-transform';

export const BubbleChart = (props:{height:number,width:number,data:any[]}) => {
    const {
      height,
      width,
      data,
    } = props;

    let pack = (data: any[]) => d3.pack()
      .size([width - 2, height - 2])
      .padding(3)
      (d3.hierarchy({ children: data })
        .sum((d) => {
            if(d.hasOwnProperty('value')){
                //@ts-ignore
                return d?.value
            }
        }))

    const root = pack(data);
    let fontSizeGenerator = (value: number,name: string) => {
      if(name.length>3){
        return (value/100)*15
      }
      return (value/100)*30
    }

    const getTextName = (text: string) =>{
      if(text.includes('EURO')){
        return handleOtherCurrencies({currentPair:text,current:text}).currentPair
      }
      return text
    }

    let leaves = []
    for (let leaf of root.leaves()) {
      leaves.push(
        <g
                //@ts-ignore
        key={leaf.data.color}
        //@ts-ignore
        transform={`translate(${leaf.x + 1},${leaf.y + 1})`}>
          <circle
          stroke="black"
          stroke-width="0.5"
            // {...circleProps}
            //@ts-ignore
            r={leaf.r}
                //@ts-ignore
            fill={leaf.data.color}
          />
          <text
          fontWeight={'500'}
            // {...textProps}
            //@ts-ignore
            fill={'black'}
                //@ts-ignore
            fontSize={fontSizeGenerator(leaf.data.value,leaf.data.name)}
            x="0"
                //@ts-ignore
            y={leaf.data.value * 0.1}
                //@ts-ignore
            textAnchor="middle" >{getTextName(leaf.data.name)}</text>
        </g>
      )
    }

    return (
      <View style={styles.container}>
        {//@ts-ignore
        <svg width={width || 400} height={height || 300}>
          {leaves}
        </svg>}
      </View>
    )
  }

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
})