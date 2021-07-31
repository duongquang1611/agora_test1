/* eslint-disable consistent-return */
import { PERMISSION_APP, staticValue } from 'feature/staticData';
import i18next from 'i18next';
import { Alert } from 'react-native';
import { check, openSettings, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { isIos, logger } from '../helper';

const requestCasePermission = async (checkPermission: string, type: string, permission: Permission) => {
    try {
        let result = '';
        switch (checkPermission) {
            case RESULTS.DENIED:
                result = await request(permission);
                return result === RESULTS.GRANTED;
            case RESULTS.LIMITED:
                return true;
            case RESULTS.UNAVAILABLE:
                return true;
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                showRequestPermission(type);
                return false;
            default:
                return false;
        }
    } catch (error) {
        logger(error);
        return false;
    }
};

export const checkCamera = async () => {
    try {
        const permissionRequest = isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
        const checkPermission = await check(permissionRequest);
        const result = await requestCasePermission(checkPermission, PERMISSION_APP.camera, permissionRequest);
        return result;
    } catch (err) {
        logger(err);
        return false;
    }
};

export const checkBlockCamera = async () => {
    try {
        const checkPermission = await check(isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
        if (checkPermission === RESULTS.BLOCKED) {
            showRequestPermission('camera');
        }
    } catch (err) {
        logger(err);
    }
};

export const checkPhoto = async () => {
    try {
        const permissionRequest = isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        const checkPermission = await check(permissionRequest);
        const result = await requestCasePermission(checkPermission, PERMISSION_APP.photo, permissionRequest);
        return result;
    } catch (err) {
        logger(err);
        return false;
    }
};

export const checkAudio = async () => {
    try {
        const permissionRequest = isIos ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
        const checkPermission = await check(permissionRequest);
        const result = await requestCasePermission(checkPermission, PERMISSION_APP.audio, permissionRequest);
        return result;
    } catch (err) {
        logger(err);
        return false;
    }
};

const appName = staticValue.APP_DISPLAY_NAME.toUpperCase();
const messages: any = {
    camera: i18next.t('permissions.camera', { appName }),
    photo: i18next.t('permissions.photo', { appName }),
    audio: i18next.t('permissions.audio', { appName }),
};

const showRequestPermission = (type: string) => {
    Alert.alert(
        'Sell Me',
        messages[type],
        [
            {
                text: i18next.t('alert.button.no'),
                onPress: () => logger('Cancel Pressed'),
                style: 'default',
            },
            {
                text: i18next.t('alert.button.yes'),
                onPress: () => openSettings().catch(() => console.warn('cannot open settings')),
            },
        ],
        { cancelable: false },
    );
};
