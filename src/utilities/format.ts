import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import calendar from 'dayjs/plugin/calendar';
import { staticValue, STORE_APP_ID } from 'feature/staticData';
import i18next from 'i18next';
import { isIos } from './helper';

dayjs.extend(calendar);
dayjs.locale('ja');

export const changeLocale = (locale: string): void => {
    dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
export const formatDataByAlphabet = (data: any[], key: string): any => {
    const dataSort = data.sort((a: any, b: any) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0));
    const formatData = dataSort.reduce((acc, item) => {
        const group = item[key][0].toUpperCase();
        if (!acc[group]) acc[group] = [item];
        else acc[group].push(item);
        return acc;
    }, {});
    return formatData;
};
export const formatPhoneNumber = (text: string, reverse = false) => {
    let formated = '';
    let regex;
    if (reverse) {
        regex = /[()-]/g;
        formated = text.replace(regex, '');
    } else {
        const { length } = text;
        formated = `${length > 0 ? '(' : ''}${text.substring(0, 3)}${length > 3 ? ')' : ''}${text.substring(3, 7)}${
            length > 7 ? '-' : ''
        }${text.substring(7)}`;
    }
    return formated;
};
export const formatMoney = (number: number) => {
    return new Intl.NumberFormat('ja-JP', { currency: 'JPY' }).format(number);
};
export const formatPostCode = (postCode: string) => {
    if (!postCode) return {};
    const { LENGTH_START_POSTAL_CODE, POSTAL_CODE } = staticValue;
    let start = '';
    let end = '';
    if (postCode.includes('-')) {
        [start, end] = postCode.split('-');
    } else {
        start = postCode.substring(0, LENGTH_START_POSTAL_CODE);
        end = postCode.substring(LENGTH_START_POSTAL_CODE);
    }
    return {
        start,
        end,
        format: `${POSTAL_CODE}${start}-${end}`,
    };
};

export const formatJapanTime = (time: string) => dayjs(time).format('YYYY年MM月DD日 HH:ss');

export const formatTimeNotify = (time: Date) => {
    const { SECOND_IN_DAY } = staticValue;
    let dateFormatted = '';
    const now = dayjs();
    const diff = now.diff(time, 'second');
    const timeEndDate = new Date();
    timeEndDate.setHours(0);
    timeEndDate.setMinutes(0);
    timeEndDate.setSeconds(0);
    const newDayJs = dayjs(timeEndDate);
    const diffEndDate = Math.abs(newDayJs.diff(now, 'second'));

    if (diff < 60) {
        dateFormatted = i18next.t('common.justNow');
    } else if (diff < SECOND_IN_DAY * 2 + diffEndDate && diff > diffEndDate) {
        let countDay = 0;
        if (diff < SECOND_IN_DAY) {
            countDay = 1;
        } else {
            countDay = Math.floor(diff / SECOND_IN_DAY);
        }
        dateFormatted = `${countDay}${i18next.t('common.prevDay')}`;
    } else {
        dateFormatted = dayjs(time).calendar('', {
            sameDay: `HH:mm`,
            lastDay: `[${i18next.t('common.prevDay')}]`,
            lastWeek: 'HH:mm dddd',
            sameElse: 'HH:mm YYYY/MM/DD',
        });
    }
    return dateFormatted;
};

export const formatGroupBank = (banks = []) => {
    const groupBanks: any = {};
    banks.forEach((element: any) => {
        if (groupBanks[element.groupBank.name[0]]) groupBanks[element.groupBank.name[0]].push(element);
        else groupBanks[element.groupBank.name[0]] = [element];
    });
    const groupBanksOrdered = Object.keys(groupBanks)
        .sort()
        .reduce((obj: any, key) => {
            obj[key] = groupBanks[key];
            return obj;
        }, {});
    return groupBanksOrdered;
};

export const getFinalOffer = (offers = []) => {
    let finalOffer = {};
    if (!Array.isArray(offers)) {
        finalOffer = offers === null ? {} : offers;
    } else {
        const idMax = Math.max(...offers.map((itemOffer: any) => itemOffer.id));
        finalOffer = offers.find((dataOffer: any) => dataOffer.id === idMax) || {};
    }
    return finalOffer;
};

export const getStoreUrl = () => {
    const storeLink = isIos
        ? `itms-apps://itunes.apple.com/us/app/id${STORE_APP_ID.IOS}?mt=8`
        : `market://details?id=${STORE_APP_ID.ANDROID}`;
    return storeLink;
};
