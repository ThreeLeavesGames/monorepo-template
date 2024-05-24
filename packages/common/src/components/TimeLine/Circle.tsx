import React, { ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  Animated,
  View,
  ActivityIndicator,
  Easing
} from "react-native";
import { customColors } from "../../constants/constant";

const defaultCircleSize = 18;

const blue = customColors.peterRiver;

export const Circle = (props:{backgroundColor: string,current: number,rowID: number,isIcon: boolean}) => {
  const { backgroundColor, current, rowID, isIcon } = props;
  const [value] = useState(new Animated.Value(1));
  const [subtractValue] = useState(new Animated.Value(0.6));
  const [multiplyValue] = useState(new Animated.Value(0));
  const [zero] = useState(new Animated.Value(0));

  const duration = 200;

  const [isLoading, setLoading] = useState(true);

  const styles = getStyles(backgroundColor, rowID);

  useEffect(() => {
    if (current === rowID)
      Animated.sequence([
        Animated.timing(multiplyValue, {
          toValue: -3,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear
        }),
        Animated.timing(multiplyValue, {
          toValue: 5,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(multiplyValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(multiplyValue, {
          toValue: 3,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]).start();
  }, [current]);

  if (current === rowID) {
    Animated.spring(value, {
      toValue: 1.5,
      bounciness: 60,
      speed: 0.5,
      useNativeDriver: true,
      delay: 100
    }).start();
  } else {
    multiplyValue.setValue(0);
    Animated.spring(value, {
      toValue: 1,
      useNativeDriver: true,
      delay: 100
    }).start();
  }
  if (isIcon) {
    setTimeout(() => setLoading(false), 1000);
  } else if (!isIcon && !isLoading) {
    setLoading(true);
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: value }, { translateY: multiplyValue }]
        }
      ]}
    >
      {!isIcon ? (
        <>
          {current === rowID && (
            <Animated.View
              style={[
                styles.current,
                {
                  transform: [
                    { scale: Animated.subtract(value, subtractValue) }
                  ]
                }
              ]}
            >
              <Animated.Text style={styles.text}>{rowID + 1}</Animated.Text>
            </Animated.View>
          )}
          <Text style={styles.text}>{rowID + 1}</Text>
        </>
      ) : (
        <>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator
                animating={isLoading}
                hidesWhenStopped
                color={"white"}
                size={15}
              />
            </View>
          ) : (
            <Text style={styles.text}>{rowID + 1}</Text>
          )}
        </>
      )}
    </Animated.View>
  );
};

const getStyles = (backgroundColor: string, rowID: number) => {
  return StyleSheet.create({
    loader: {
      zIndex: 1,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      transform: [{ scale: 0.6 }]
    },
    container: {
      zIndex: 1,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      width: defaultCircleSize,
      height: defaultCircleSize,
      borderRadius: defaultCircleSize / 2,
      backgroundColor,
      left: 12,
      marginTop: rowID === 0 ? defaultCircleSize / 4 : undefined
    },
    current: {
      zIndex: 2,
      opacity: 1,
      width: defaultCircleSize / 1.4,
      height: defaultCircleSize / 1.4,
      borderRadius: defaultCircleSize / 2,
      backgroundColor: blue,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center"
    },
    text: {
      color: "white",
      fontWeight: "700",
      alignSelf: "center",
      fontSize: 9,
      textAlign: "center"
    }
  });
};

// comments required
// const memoizedStepperCircle = React.memo(StepperCircle);
// export { memoizedStepperCircle as StepperCircle };
