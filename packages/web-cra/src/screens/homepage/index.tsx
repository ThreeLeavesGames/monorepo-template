'use client'
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { app } from "../../utils/firebase";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import HomepageChild from '@monorepo/common/src/organisims/home';

const HomePage = () => {
    const [url, setUrl] = useState({currencyUrl:'',table_finalURL:''});
    const getUrl = async ()=>{
        const storage = getStorage(app);
        const currencyUrl = await getDownloadURL(ref(storage, "currency.json"));
        const table_finalURL = await getDownloadURL(ref(storage, "table_final.json"));
        console.log({currencyUrl,table_finalURL})
        setUrl({currencyUrl,table_finalURL})
    }
    useEffect(()=>{
        getUrl()  
    },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display:'flex'
      }}>
      <HomepageChild
      currencyUrl={url.currencyUrl}
      table_finalURL={url.table_finalURL}
      />
    </View>
  )
}
export default HomePage;