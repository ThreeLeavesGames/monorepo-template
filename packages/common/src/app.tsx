'use client'
import React from 'react';
import {Text, View} from 'react-native';

const CommonApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'red'
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};

export { CommonApp };

