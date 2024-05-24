import React from 'react'
import { ActivityIndicator, View } from "react-native"

const RefreshingComponent = () =>{
    return(
        <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <ActivityIndicator animating={true}size={'small'} style={{justifyContent:'center'}} />
    </View>
    )
}

export default RefreshingComponent