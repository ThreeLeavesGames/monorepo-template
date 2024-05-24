export interface IHomeContext {
    currencyArray: string[],
    cotData:string[]
  }

export const initialHomeState = {
    currencyArray: [],
    cotData:[]
};

export enum CURRENCY_DATA_TYPES {
    CURRENCY_ARRAY = 'CURRENCY_ARRAY',
    COT_DATA = 'COT_DATA',
}

export const HomeReducer = (state, action) => {
    switch (action.type) {
        case CURRENCY_DATA_TYPES.CURRENCY_ARRAY:
            return {
                ...state,
                currencyArray: action.payload,
            };
        case CURRENCY_DATA_TYPES.COT_DATA:
            return {
                ...state,
                cotData: action.payload,
            };
        default:
            return state;
    }
};
