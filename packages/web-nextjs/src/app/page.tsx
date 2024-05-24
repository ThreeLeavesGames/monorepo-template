import CommonApp from "@monorepo/web-cra/src/App"
import Image from "next/image"
// import Home from "../screen/Home"
import Link from "next/link"
import {View} from 'react-native' 

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/Home">Dashboard</Link>
      <View></View>
    </main>
  )
}
