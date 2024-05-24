import { Dimensions } from "react-native"

const useDimensions = ()=>{
return {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
}
};

export default useDimensions;