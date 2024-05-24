class Repository {
    public getCurrencyArray = async (currencyUrl: string)=>{
        const rawRes = await fetch(currencyUrl);
        const json = await rawRes.json();   
           return json;
     }
     public getCotData = async (url: string) => {
        const rawJson =  fetch(url);
        const json = await (await rawJson).json();
          return Object.values(json.data);
         
      };
}

const repository = new Repository();
export { repository as Repository };