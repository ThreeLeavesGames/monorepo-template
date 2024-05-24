import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 507.2 507.2"
      xmlSpace="preserve"
      enableBackground="new 0 0 507.2 507.2"
      width={30}
      height={30}
      {...props}
    >
      <Circle cx={253.6} cy={253.6} r={253.6} fill="#f15249" />
      <Path
        d="M147.2 368L284 504.8c115.2-13.6 206.4-104 220.8-219.2L367.2 148l-220 220z"
        fill="#ad0e0e"
      />
      <Path
        d="M373.6 309.6c11.2 11.2 11.2 30.4 0 41.6l-22.4 22.4c-11.2 11.2-30.4 11.2-41.6 0l-176-176c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0l175.2 176.8z"
        fill="#fff"
      />
      <Path
        d="M280.8 216L216 280.8l93.6 92.8c11.2 11.2 30.4 11.2 41.6 0l23.2-23.2c11.2-11.2 11.2-30.4 0-41.6L280.8 216z"
        fill="#d6d6d6"
      />
      <Path
        d="M309.6 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6L197.6 373.6c-11.2 11.2-30.4 11.2-41.6 0l-22.4-22.4c-11.2-11.2-11.2-30.4 0-41.6l176-176z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
