import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BookMarkSvg(props:any) {
  return (
    //@ts-ignore 
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="50"
      height="50"
      viewBox="0 0 537.953 537.952"
      xmlSpace="preserve"
      enableBackground="new 0 0 537.953 537.952"
      {...props}
    >
      <Path d="M346.164 0H191.939c-11.857 0-21.497 9.716-21.497 21.497v505.894c0 11.857 6.12 14.076 13.617 4.896 0 0 56.304-68.697 70.609-87.822 14.306-19.125 15.683-21.268 32.972 0 17.365 21.268 66.938 87.363 66.938 87.363 7.191 9.41 12.929 7.496 12.929-4.283V21.497C367.66 9.716 357.945 0 346.164 0z" />
    </Svg>
  )
}

export default BookMarkSvg
