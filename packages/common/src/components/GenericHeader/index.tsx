// 'use client'
import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

interface IGenericHeader {
  title: string
  renderRightComponent?: () => React.ReactNode
  renderLeftComponent?: () => React.ReactNode
}

const GenericHeader = ({ title, renderRightComponent, renderLeftComponent }: IGenericHeader) => {

  return (
    <View
      style={{
        flexDirection: "row",
        display: "flex",
        height: 50,
        width: "100%",
        justifyContent: "space-between",
        // marginBottom:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0.5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 3,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
        {!!renderLeftComponent && renderLeftComponent()}
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "black", paddingHorizontal: 10 }}>{title}</Text>
      </View>
      {!!renderRightComponent && renderRightComponent()}
    </View>
  )
}
export default GenericHeader
