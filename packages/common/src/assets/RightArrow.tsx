import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface IIconProps{
    width:number,
    height:number,
} 
function RightArrow(props: IIconProps) {
  return (
    <Svg
    //   xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
    //   width="434.002px"
    //   height="434.002px"
      viewBox="0 0 434.002 434.002"
    //   xmlSpace="preserve"
    //   enableBackground="new 0 0 434.002 434.002"
      {...props}
    >
      <Path d="M95.457 434.002l-33.105-45.076 234.094-171.928L62.352 45.077 95.456 0 360.24 194.459a27.964 27.964 0 010 45.077L95.457 434.002z" />
    </Svg>
  )
}

export default RightArrow