import React, { createContext, useContext, useReducer } from "react";
import { HomeReducer, IHomeContext, initialHomeState } from "./reducer";

const HomeContext = createContext<{
  dispatch: React.Dispatch<any>;
  state: IHomeContext;
}>({
  state: initialHomeState,
  dispatch: () => null,
});

const HomeProvider: React.FC<any> = (props) => {
  const [state, dispatch] = useReducer(HomeReducer, initialHomeState);
  return (<HomeContext.Provider value={{ state, dispatch }}>
    {props?.children}
  </HomeContext.Provider>)
};

const useHomeContext = () => {
  const context = useContext<{
    dispatch: React.Dispatch<any>;
    state: IHomeContext;
  }>(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used inside a HomeProvider');
  }
  const { state, dispatch } = context;

  // const getCurrencyArray = async (currencyUrl: string)=>{
  //    const rawRes = await fetch(currencyUrl);
  //    const json = await rawRes.json();
  //       // .then((response) => response.json())
  //       // .then((res) => {
  //       //   console.log({res})
  //       //  return res
  //       // })
  //       // .catch((error) => {throw new Error(error)});

  //       return json;
  // }

  // const getCotData = async (url: string) => {
  //   const rawJson =  fetch(url);
  //   const json = await (await rawJson).json();
  //     // .then((response) => response.json())
  //     // .then((res) => {
  //     //  return Object.values(res.data);
  //     // })
  //     // .catch((error) => {throw new Error(error)});
  //     return Object.values(json.data);
     
  // };

  return { state, dispatch};

}

export { HomeContext, HomeProvider, useHomeContext };
