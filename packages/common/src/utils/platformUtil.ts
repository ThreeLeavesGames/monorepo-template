import {Platform } from 'react-native'

export const PlatormUtil = ():{isAndroid:boolean,isWeb:boolean,isIOS: boolean} =>{

    return {
        isAndroid:Platform.OS == 'android',
        isWeb:Platform.OS == 'web',
        isIOS:Platform.OS == 'ios',
    }
}