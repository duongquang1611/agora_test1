import { CommonActions, StackActions } from '@react-navigation/native';
import { store } from 'app-redux/store';
import React, { RefObject } from 'react';
import { updateBlacklist } from '../app-redux/blacklist/actions';
import { APP_ROUTE } from './config/routes';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params = {}): void {
    store.dispatch(updateBlacklist({ focusScreen: name }));
    navigationRef.current.navigate(name, params);
}
export function push(name: string, params = {}): void {
    navigationRef.current.dispatch(StackActions.push(name, params));
}
export function goBack(): void {
    navigationRef.current.goBack();
}

export function navigateReplace(name: string, params = {}): void {
    store.dispatch(updateBlacklist({ focusScreen: name }));
    navigationRef.current.dispatch(StackActions.replace(name, params));
}

export function reset(name?: string) {
    navigationRef.current.dispatch({
        ...CommonActions.reset({
            index: 1,
            routes: [{ name: name || APP_ROUTE.MAIN_TAB }],
        }),
    });
}
