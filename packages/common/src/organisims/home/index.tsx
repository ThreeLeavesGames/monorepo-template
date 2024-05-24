"use client"
import React, { useEffect, useState } from "react"
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
// import { app } from "../../components/firebase";
// import { ref, getStorage, getDownloadURL } from "firebase/storage";
import { currencyArray, currenyPair, customColors, en, otherCurrencies, themeColors } from "../../constants/constant"
// import { useDispatch, useSelector } from "react-redux";
import { split } from "../../components/EconomicIndicator/economicHelper"
import { Currency, dateFormat, getDisplayData, Longs, Shorts } from "../../components/CotWeekly/cotHelper"
import useDimensions from "../../utils/dimentionUtils"
import GenericHeader from "../../components/GenericHeader"
import CurrencySelector from "../../components/CurrencySelector"
import { CustomPieChart } from "../../components/PieChart"
import ReatailSentiment from "../../components/ReatailSentiment"
import EconomicIndicator, { ICurrency } from "../../components/EconomicIndicator"
import Cot from "../../components/CotWeekly/Cot"
import BookMark from "../../components/BookMark"
import MenuIcon from "../../assets/MenuIcon"
import { getData, storageKeys } from "../../utils/localStorageUtil"
// import { readUserData, tabels } from "../../utils/firebaseDatabase.web";
import { ScreenNames } from "../../constants/screenNames"
import { Title } from "../../components/Title"
import { handleOtherCurrencies } from "./helper"
import { useHomeContext } from "../../context/home/context"
import { Repository } from "../../repository"

export interface IcotNetPositions {
  currency: string
  long: string
  short: string
  date: string
}

const HomepageChild = ({ currencyUrl, table_finalURL }: { currencyUrl: any; table_finalURL: any }): JSX.Element => {
  const [current, setCurrent] = useState({
    current: "EUR",
    currentPair: "EURUSD",
  })
  const [rawData, setRawData] = React.useState([])
  const [indexValue, setIndexValue] = React.useState(0)
  const [cotNetPositions, setCotNetpositions] = React.useState<IcotNetPositions[]>([])
  const { state, dispatch } = useHomeContext()
  const [allCurrencies, setAllCurrencies] = React.useState(currencyArray)

  const downloadCurrencyFile = async () => {
    fetch(currencyUrl)
      .then((response) => response.json())
      .then((res) => {})
      .catch((error) => console.error(error))
  }

  const downloadFile = async (currency: any) => {
    fetch(table_finalURL)
      .then((response) => response.json())
      .then((res) => {
        const arrayOfData = Object.values(res.data)
        console.log("arrayOfData", arrayOfData[0])
        //@ts-ignore
        setRawData(arrayOfData)
      })
      .catch((error) => console.error(error))
    //@ts-ignore
  }

  useEffect(() => {
    if (!!rawData && rawData.length > 0) {
      getCotNetPositions()
    }
  }, [rawData, current, indexValue])

  const getCotNetPositions = () => {
    //for currencies starting with EURO
    if (current.currentPair.includes("EURO")) {
      const { otherDataLocal, CUR } = getDisplayData(rawData, current.currentPair)

      if (CUR.length > 0) {
        const totalTrades = CUR[indexValue][Longs] + CUR[indexValue][Shorts]
        const d = {
          currency: CUR[indexValue][Currency],
          long: ((CUR[indexValue][Longs] / totalTrades) * 100).toFixed(2),
          short: ((CUR[indexValue][Shorts] / totalTrades) * 100).toFixed(2),
          date: dateFormat(CUR[indexValue]["Date"]),
        }

        setCotNetpositions([d])
        return [d]
      }
      return []
    }
    const res = split(current.currentPair, 3)?.map((value) => {
      const { otherDataLocal, CUR } = getDisplayData(rawData, value)
      const totalTrades = CUR[indexValue][Longs] + CUR[indexValue][Shorts]
      return {
        currency: CUR[indexValue][Currency],
        long: ((CUR[indexValue][Longs] / totalTrades) * 100).toFixed(2),
        short: ((CUR[indexValue][Shorts] / totalTrades) * 100).toFixed(2),
        date: dateFormat(CUR[indexValue]["Date"]),
      }
    })

    setCotNetpositions(res)
  }

  const leftMovement = () => {
    setIndexValue((val) => val + 1)
  }
  const rightMovement = () => {
    setIndexValue((val) => {
      if (val <= 0) {
        return 0
      } else {
        return val - 1
      }
    })
  }
  useEffect(() => {
    Repository.getCurrencyArray(currencyUrl).then((res) => {
      setAllCurrencies(res.currency)
    })

    Repository.getCotData(table_finalURL).then((res) => {
      setRawData(res)
    })
  }, [currencyUrl, table_finalURL])

  const dimentions = useDimensions()
  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: customColors.lightCyan, flexDirection: "column" }}>
      <GenericHeader title={"Forex Fundamentals"} />
      <ScrollView contentContainerStyle={{ display: "flex", flexDirection: "column" }} nestedScrollEnabled>
        <Title title={en.select_pair} />
        <CurrencySelector
          curreny={allCurrencies}
          parentCurrent={current}
          currenyPair={[...currenyPair, ...otherCurrencies]}
          onCallback={(value) => {
            setCurrent(value)
          }}
        />
        <Title title={en.cot_retail} />
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            width: dimentions.width,
          }}
        >
          <CustomPieChart
            data={cotNetPositions}
            leftMovement={leftMovement}
            rightMovement={rightMovement}
            containerStyle={{ width: "50%" }}
          />
          <ReatailSentiment data={handleOtherCurrencies(current)} />
        </View>
        <Title title={en.economic_data} />
        <View style={{ marginTop: 10 }}>
          <EconomicIndicator data={handleOtherCurrencies(current)} />
        </View>
        <Title title={en.weekly_cot_data} />
        <Cot
          tabelData={rawData}
          cotCurrencies={allCurrencies}
          currentPair={current.currentPair.includes("EURO") ? current.currentPair : split(current.currentPair, 3)}
        />
      </ScrollView>
    </View>
  )
}

export default HomepageChild
