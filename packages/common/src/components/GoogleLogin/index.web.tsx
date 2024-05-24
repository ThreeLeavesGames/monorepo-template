import React from 'react';
import { Text, View } from 'react-native';
// import{ GoogleLogin as GL} from 'react-google-login';
import { storageKeys, storeData } from '../../utils/localStorageUtil';
// import { useDispatch } from 'react-redux';
// import { actionType } from '../../redux/actionTypes';

const GoogleLogin = () => {
  // const dispatch = useDispatch()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
     {/* <GL
    clientId="921133777796-ag310jok9u16bcjg273069fqjodfh2o0.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={(responseGoogle)=>{
      storeData(responseGoogle,storageKeys.googleLogin);
      dispatch({type:actionType.SET_GOOGLE_SIGN_IN_DATA,payload:responseGoogle});
    }}
    onFailure={(responseGoogle)=>{
    
      storeData(responseGoogle,storageKeys.googleLogin);
      dispatch({type:actionType.SET_GOOGLE_SIGN_IN_DATA,payload:responseGoogle});
    }}
    isSignedIn
    cookiePolicy={'single_host_origin'}
  /> */}
    </View>
  )
}
export default GoogleLogin;