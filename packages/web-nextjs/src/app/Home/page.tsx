// import { Repository } from "@monorepo/common/src/repository"
// import * as React from "react"
// import { ref, getStorage, getDownloadURL } from "firebase/storage"
// import { app } from "@monorepo/web-cra/src/utils/firebase"
// // import GenericHeader from "@monorepo/common/src/components/GenericHeader"
// import { View } from "react-native"
// // import GenericHeader from "@monorepo/common/src/components/GenericHeader"

// async function getData() {
//   console.log("server isde")

//   const getUrl = async () => {
//     const storage = getStorage(app)
//     const currencyUrl = await getDownloadURL(ref(storage, "currency.json"))
//     const table_finalURL = await getDownloadURL(ref(storage, "table_final.json"))
//     console.log({ currencyUrl, table_finalURL })
//     return { currencyUrl, table_finalURL }
//   }
//   const currencyObject = await Repository.getCurrencyArray((await getUrl()).currencyUrl)
//   const tabel = await Repository.getCurrencyArray((await getUrl()).table_finalURL)

//   return { currencyObject, tabel }
// }

// const Home = async () => {
//   const {
//     currencyObject: { currency },
//     tabel,
//   } = await getData()
//   console.log({ currency })
//   // return <div></div>
//   return currency.map((cur) => {
//     return (
//       <div>
//         {/* <GenericHeader title="tt" /> */}
//         <View></View>
//       </div>
//     )
//   })
// }

// export default Home
