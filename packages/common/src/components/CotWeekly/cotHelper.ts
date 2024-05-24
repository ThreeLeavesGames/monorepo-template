// import { IcotResponse } from "../../redux/store";

export const max = "max";
export const min = "min";

export const Longs = "Longs";
export const Shorts = "Shorts";

export const Currency = "Currency";

export const date = "Date";
export const changedShorts = "Changed Shorts";
export const changedLongs = "Changed Longs";

export const LongsNormalized = "LongsNormalized";
export const ShortsNormalized = "ShortsNormalized";
export const changedShortsNormalized = "Changed Shorts Normalized";
export const changedLongsNormalized = "Changed Longs Normalized";

const M3 = "3M";
const M6 = "6M";

export const dateFormat = (strDate: string) => {
  //@ts-ignore
  Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
  //@ts-ignore
    var date = new Date(strDate).addHours(10);
    return date.toString().substr(4, 6); // "Wed Jun 29 2011 09:52:48 GMT-0700 (PDT)"
  };

const getFormatedData = (CUR) => {
    return {
      [Longs]: CUR?.map((val) => {
        return val["Longs"];
      }).reverse(),
      [Shorts]: CUR?.map((val) => {
        return val["Shorts"];
      }).reverse(),
      [date]: CUR?.map((val) => {
        return dateFormat(val["Date"]);
      }).reverse(),
      [changedShorts]: CUR?.map((val) => {
        return val[changedShorts];
      }).reverse(),
      [changedLongs]: CUR?.map((val) => {
        return val[changedLongs];
      }).reverse(),
    };
  };


export const getDisplayData = (tabelData: any,value: string)=>{
    const CUR = tabelData.filter((val) => val["Currency"] == value);
    let otherDataLocal: any = getFormatedData(CUR);

    const MaxMinLong = {
      [max]: Math.max(...otherDataLocal.Longs),
      [min]: Math.min(...otherDataLocal.Longs),
    };
    const MaxMinShorts = {
      [max]: Math.max(...otherDataLocal.Shorts),
      [min]: Math.min(...otherDataLocal.Shorts),
    };
    const MaxMinDLongs = {
      [max]: Math.max(...otherDataLocal[changedLongs]),
      [min]: Math.min(...otherDataLocal[changedLongs]),
    };
    const MaxMinDShorts = {
      [max]: Math.max(...otherDataLocal[changedShorts]),
      [min]: Math.min(...otherDataLocal[changedShorts]),
    };

    otherDataLocal[LongsNormalized] = otherDataLocal.Longs?.map((val: number) => {
      return (val - MaxMinLong.min) / (MaxMinLong.max - MaxMinLong.min);
    });
    otherDataLocal[ShortsNormalized] = otherDataLocal.Shorts?.map((val: number) => {
      return (val - MaxMinShorts.min) / (MaxMinShorts.max - MaxMinShorts.min);
    });

    otherDataLocal[changedShortsNormalized] = otherDataLocal[changedShorts]?.map(
      (val: number) => {
        return (
          (val - MaxMinDShorts.min) / (MaxMinDShorts.max - MaxMinDShorts.min)
        );
      }
    );
    otherDataLocal[changedLongsNormalized] = otherDataLocal[changedLongs].map(
      (val: number) => {
        return (val - MaxMinDLongs.min) / (MaxMinDLongs.max - MaxMinDLongs.min);
      }
    );

    return {
        otherDataLocal,
        CUR
    }
}