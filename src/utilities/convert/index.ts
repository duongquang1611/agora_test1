import { store } from 'app-redux/store';
import { staticValue } from 'feature/staticData';

/* eslint-disable import/prefer-default-export */
export const countTime = (time: any) => {
    let minutes: any = Math.floor(time / staticValue.VALUE_OFF_SECOND);
    let seconds: any = time % staticValue.VALUE_OFF_SECOND;
    if (minutes === staticValue.NO_VALUE) {
        minutes = `${minutes}`;
    }
    if (seconds === staticValue.NO_VALUE || seconds < staticValue.SECOND_MIN) {
        seconds = `0${seconds}`;
    }
    const timeCountDown = `0${minutes}:${seconds}`;
    return timeCountDown;
};

export const joinArr = (arr: any = [], separator = '   ') => {
    const filtered = arr.filter(Boolean);
    return filtered.join(separator);
};

export const filterCardByType = (arr = [], value: number | string, key = 'type') => {
    return arr.filter((item) => item[key] === value);
};

export const formatOffer = (dataOffer: any) => {
    const { brands, categories } = store.getState().resource;
    const categoryOffer = categories.filter((obj: any) => obj.id === dataOffer?.categoryId);
    const brandOffer = brands.filter((obj: any) => obj.id === dataOffer?.brandId);
    const formatOfferData = {
        ...dataOffer,
        currency: staticValue.CURRENCY,
        brand: brandOffer?.[0]?.name,
        category: categoryOffer?.[0]?.name,
    };
    return formatOfferData;
};

export const convertSecondToMinuteSecond = (time = 0) => {
    const mins = Math.floor(time / staticValue.MINUTE_VALUE);
    const seconds = Math.ceil((time - mins * staticValue.MINUTE_VALUE) / 1000);
    return {
        mins: mins < 10 ? `0${mins}` : mins,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
};

export const convertSecondToMinute = (time = 0) => {
    const mins = Math.round(time / staticValue.MINUTE_VALUE);
    return mins;
};

export const getConfig = (key: string) => {
    const { configs = [] } = store.getState().resource;
    return configs.find((item: any) => item.key === key) || {};
};
