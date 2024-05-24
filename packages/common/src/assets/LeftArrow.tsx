import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IIconProps{
    width:number,
    height:number,
} 

function LeftArrow(props: IIconProps) {
    const {width,height} = props
  return (
    <Svg
      // width={width}
      // height={height}
      viewBox="0 0 24 24"
      data-name="Livello 1"
      {...props}
    >
      <Path
        d="M16.23 23.58l2.24-2a.5.5 0 000-.71L10.57 12l7.93-8.87a.5.5 0 000-.71l-2.24-2a.5.5 0 00-.71 0L5.2 12l10.32 11.54a.5.5 0 00.71.04z"
        data-name="Arrow Left"
      />
    </Svg>
  )
}

export default LeftArrow
