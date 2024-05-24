import React, { memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type ITriangleProps = {
  isDown?: boolean;
  pointerColor?: string;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});

const Triangle: React.FC<ITriangleProps> = (props: ITriangleProps) => {
  const { style, pointerColor, isDown } = props;
  return (
    <View
      style={StyleSheet.flatten([
        styles.triangle,
        {
          borderBottomColor: pointerColor,
          // flex:1
        },
        style,
        isDown ? styles.down : {},
      ])}
    />
  );
};
export default memo(Triangle);
