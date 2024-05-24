import { ICurrency } from "../../components/EconomicIndicator"

export const handleOtherCurrencies = (current:ICurrency):ICurrency =>{
    const defaultReturn =  {
      current:'EUR',
      currentPair:'EURUSD',
    }
    if(current.currentPair.includes('EURO')){
      switch (current.currentPair) {
        case 'EURODOLLARS':
          return{
            current:'EUR',
            currentPair:'EURUSD',
          }
          case 'EUROGBP':
            return{
              current:'EUR',
              currentPair:'EURGBP',
            } 
            case 'EUROJPY':
              return{
                current:'EUR',
                currentPair:'EURJPY',
              } 
        default:
          return defaultReturn
      }
     
    }
    return current
  }