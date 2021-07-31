/* eslint-disable no-console */
import i18next from 'i18next';
import { DevSettings, Linking, Platform } from 'react-native';
import Picker from 'react-native-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { staticValue } from 'feature/staticData';
import { addHttp } from './validate';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export function wait(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function logger(msg: string, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        if (params) console.log(msg, params);
        else console.log(msg);
    }
    if (__DEV__ && isWarning) {
        if (params) console.warn(msg, params);
        else console.warn(msg);
    }
}

export function initPicker(params?: any) {
    Picker.init({
        pickerTextEllipsisLen: 10,
        pickerCancelBtnText: i18next.t('common.cancel'),
        pickerConfirmBtnText: i18next.t('common.confirm'),
        ...params,
    });
}

export function openURL(url: string, addHttpURL = true) {
    let newUrl = url;
    if (addHttpURL) {
        newUrl = addHttp(url);
    }
    Linking.canOpenURL(newUrl).then((supported) => {
        if (supported) {
            Linking.openURL(newUrl);
        } else {
            __DEV__ && console.log(`Don't know how to open URI: ${newUrl}`);
        }
    });
}
export async function countJoinFunction(key: any, increase = true) {
    const value = await AsyncStorage.getItem(key);
    let count;
    if (value) {
        count = Number(value);
        if (increase) {
            count += staticValue.DEFAULT_VALUE;
        }
        await AsyncStorage.setItem(key, count.toString());
    } else {
        await AsyncStorage.setItem(key, '1');
    }
    return AsyncStorage.getItem(key);
}

export const addMenuClearAsyncStorage = () => {
    if (__DEV__) {
        DevSettings.addMenuItem('Clear AsyncStorage', () => {
            AsyncStorage.clear();
            DevSettings.reload();
        });
    }
};
