import * as React from 'react';
import { Alert, Dimensions, FlatList, ScrollView, Switch, Text, View } from 'react-native';
// @ts-ignore
import cheerio from '../cheerio';
import GenericHeader from '../GenericHeader';
import { CustomBarChart } from '../BarChart';
import { ICurrency } from '../EconomicIndicator';
import { currenyPair, themeColors } from '../../constants/constant';
import { PlatormUtil } from '../../utils/platformUtil';
import RefreshingComponent from '../RefreshingComponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface IResponse {
  pair:string;
  shorts:string;
  longs:string;
}

const ReatailSentiment = ({data
}:{data:ICurrency}) => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [currencyPairs, setCurrencyPairs] = React.useState<IResponse[]>([{pair:'EURUSD',shorts:'50',longs:'50'}]);
  const [isRefreshing, setRefreshing] = React.useState(true);
    
  const platform = PlatormUtil()
  React.useEffect(() => {
    fetchWebPage()
  }, []);
const herokuCorsApp = 'https://cors-anywhere.herokuapp.com'
  const fetchWebPage = () => {
    setRefreshing(true)
    const url = platform.isAndroid?'https://www.myfxbook.com/community/outlook':`${herokuCorsApp}/https://www.myfxbook.com/community/outlook`
    fetch(url,{mode:'cors'}).then(async res => {
      const text = await res.text();

      let $ = cheerio.load(text);
      const result = currenyPair?.map((pair)=>{
      let htmlElement = $(`tr[symbolName="${pair}"]`).html();
      // @ts-ignore
      let shorts: string = $('.progress-bar-danger', htmlElement)?.toArray()[0]?.attribs?.style;
      // @ts-ignore
      let longs: string = $('.progress-bar-success', htmlElement)?.toArray()[0]?.attribs?.style;
      return {
        pair,shorts:shorts?.replace(/\D/g, ''),longs:longs?.replace(/\D/g, '')
      }
    })
    setCurrencyPairs(result);
    // getbarData(result)
      setRefreshing(false)
    });
  };

  const getbarData = (value: IResponse[]) =>{
    // console.log("dfgdg",data,)
    const currency:IResponse[] = value.filter((val)=>val.pair == data.currentPair)
    const isEmpty = currency.length == 0;

    return {
      labels: ["buy", "sell"],
      datasets: [
        {
          data: [isEmpty?0 :currency[0].longs, isEmpty?0 :currency[0].shorts,100],
          colors: [
            (opacity = 1) => themeColors.green,
            (opacity = 1) => themeColors.red,
            (opacity = 1) => `rgb(0,0,0,0)`,
        ]
        },
      ],
    }
  }
  if(isRefreshing){
    return(
      <RefreshingComponent/>
    )
  }
  return (
    <CustomBarChart
    data={getbarData(currencyPairs)}
    />
  );
};

export default ReatailSentiment;
