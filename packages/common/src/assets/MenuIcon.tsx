import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MenuIcon(props:any) {
  return (
    //@ts-ignore 
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 297 297"
      xmlSpace="preserve"
      enableBackground="new 0 0 297 297"
      {...props}
    >
      <Path d="M20.23 58.5H276.78000000000003V81.66H20.23z" fill="#ffcd02" />
      <Path
        d="M20.23 136.92H276.78000000000003V160.07999999999998H20.23z"
        fill="#ffa800"
      />
      <Path d="M20.23 215.34H276.78000000000003V238.5H20.23z" fill="#e67e22" />
      <Path d="M297 215.04v23.76c0 10.99-8.94 19.92-19.92 19.92H19.93C8.94 258.72 0 249.79 0 238.8v-23.76c0-10.98 8.94-19.92 19.93-19.92h257.15c10.98 0 19.92 8.94 19.92 19.92zm-20.22 23.46v-23.16H20.23v23.16h256.55zM297 136.62v23.76c0 10.99-8.94 19.92-19.92 19.92H19.93C8.94 180.3 0 171.37 0 160.38v-23.76c0-10.99 8.94-19.92 19.93-19.92h257.15c10.98 0 19.92 8.93 19.92 19.92zm-20.22 23.46v-23.16H20.23v23.16h256.55zM297 58.2v23.76c0 10.98-8.94 19.92-19.92 19.92H19.93C8.94 101.88 0 92.94 0 81.96V58.2c0-10.99 8.94-19.92 19.93-19.92h257.15c10.98 0 19.92 8.93 19.92 19.92zm-20.22 23.46V58.5H20.23v23.16h256.55z" />
    </Svg>
  )
}

export default MenuIcon