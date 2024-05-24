import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Modal, NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View } from 'react-native';




const RiskReward = (props: {callBack:(val: string[])=>void,initialStateProps:string[]}): React.ReactElement => {
  const {initialStateProps= ['', '']} = props; 
  const [otpArray, setOtpArray] = useState(initialStateProps);
  const [showResend, setShowResend] = useState(false);
  const [value, setValue] = useState(initialStateProps);

  const [modalVisible, setModalVisible] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [timer, setTimer] = useState(20);

  const firstTextInputRef = useRef<any>();
  const secondTextInputRef = useRef<any>();
  // const thirdTextInputRef = useRef<any>();
  // const fourthTextInputRef = useRef<any>();
  // const fifthTextInputRef = useRef<any>();
  // const sixthTextInputRef = useRef<any>();
  const childRef = useRef();
  const ref = useRef(null);


  const [toggleCaptcha, setToggleCaptcha] = useState(false);

  // useEffect(()=>{
  //   setOtpArray(initialStateProps)
  //   setValue(initialStateProps)
  //   console.log(initialStateProps)
  // },[initialStateProps])

  const refCallback = (textInputRef: React.RefObject<TextInput>) => (node: React.RefObject<TextInput>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    textInputRef.current = node;
  };

  const checkOTPCallback = useCallback((): boolean => {
    for (let index = 0; index < otpArray.length; index++) {
      if (otpArray[index] == '') {
        return false;
      }
    }
    return true;
  }, [otpArray]);

  useEffect(() => {
    if (checkOTPCallback()) {
      props.callBack(otpArray)
    }
  }, [otpArray]);



  const onOtpChange = useCallback(
    (index: number, onChange: (value: string,index: number) => void) => {
      return (value: string) => {
        console.log(value)
        if (isNaN(Number(value)) && value !== '.') {
          return;
        }
        if (onChange) onChange(value,index);
        const otpArrayCopy = [...otpArray];
        otpArrayCopy[index] = value;
        setOtpArray(otpArrayCopy);

        if (value !== '' && secondTextInputRef?.current != undefined) {
          if (index === 0) {
            secondTextInputRef.current.focus();
          }
          //  else if (index === 1) {
          //   thirdTextInputRef.current.focus();
          // } else if (index === 2) {
          //   fourthTextInputRef.current.focus();
          // } else if (index === 3) {
          //   fifthTextInputRef.current.focus();
          // } else if (index === 4) {
          //   sixthTextInputRef.current.focus();
          // }
        }
      };
    },
    [otpArray]
  );

  const onOtpKeyPress = useCallback(
    (index: number) => {
      return ({ nativeEvent: { key: value } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (value === 'Backspace' && otpArray[index] === '') {
          if (index === 1) {
            firstTextInputRef.current.focus();
          } else if (index === 2) {
            secondTextInputRef.current.focus();
          } 
          // else if (index === 3) {
          //   thirdTextInputRef.current.focus();
          // } else if (index === 4) {
          //   fourthTextInputRef.current.focus();
          // } else if (index === 5) {
          //   fifthTextInputRef.current.focus();
          // }

          if (index > 0) {
            const otpArrayCopy = [...otpArray];

            otpArrayCopy[index - 1] = '';
            setOtpArray(otpArrayCopy);
          }
        }
      };
    },
    [otpArray]
  );

  // const isError: boolean = Object.keys(errors).length > 0;

  // const resendOTP = () => {

  //   if (firstTextInputRef.hasOwnProperty('current') && !!firstTextInputRef.current) {
  //     firstTextInputRef.current.clear();
  //     secondTextInputRef.current.clear();
  //     // thirdTextInputRef.current.clear();
  //     // fourthTextInputRef.current.clear();
  //     // fifthTextInputRef.current.clear();
  //     // sixthTextInputRef.current.clear();
  //   }
  //   if (firstTextInputRef.hasOwnProperty('current') && !!firstTextInputRef.current) {
  //     firstTextInputRef.current.focus();
  //   }
  
  // };

  // const resendCaptcha = () => {
  //   resendOTP();
  //   setToggleCaptcha(false);
  // };

  const onChangeHandler = (val: string,index: number) =>{
    let localState = value;
    localState[index] = val;
    setValue(localState);
  }

  return (
        <View style={{flexDirection:'row'}}>
          {[
            firstTextInputRef,
            secondTextInputRef,
            // thirdTextInputRef,
            // fourthTextInputRef,
            // fifthTextInputRef,
            // sixthTextInputRef,
          ]?.map((textInputRef, index) => (
            <View style={{flexDirection:'row'}}>
                  <TextInput
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    onKeyPress={onOtpKeyPress(index)}
                    onChangeText={onOtpChange(index, onChangeHandler)}
                    keyboardType={'numeric'}
                    maxLength={index == 0 ?1:3}
                    style={{borderWidth:0.5,width:50,textAlign:'center',borderRadius:5,height:30}}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    value={value[index]}
                    textContentType={'oneTimeCode'}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={index == 0 ? true : false}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    ref={refCallback(textInputRef)}
                    key={index}
                    textAlign="center"
                  />
                  {index == 0 && <Text style={{paddingHorizontal:5}}>:</Text>}
                  </View>
          ))}
        </View>
   
  );
};

export default RiskReward;
