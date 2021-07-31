import AlertMessage from 'components/base/AlertMessage';
import { staticValue } from 'feature/staticData';
import i18next from './i18next';

export const regexNum = /^\d+$/;
export const regexNotNum = /[^0-9]/g;
export const regexKatakana = /^[\u30A0-\u30FF\u3005]+$/i;

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\x.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim() === '') {
        AlertMessage(i18next.t('validateMessage.emailEmpty'));
        return false;
    }
    if (!re.test(String(email).toLowerCase())) {
        AlertMessage(i18next.t('validateMessage.emailInvalid'));
        return false;
    }
    return true;
};

export const validatePassword = (password: string) => {
    if (!password || password?.length < 6) {
        AlertMessage(i18next.t('alert.message.pswTooShort'));
        return false;
    }
    return true;
};

export const validateRegister = (props: any) => {
    if (!validateEmail(props.email)) {
        AlertMessage(i18next.t('validateMessage.emailInvalid'));
        return false;
    }
    if (!validatePassword(props.password)) {
        AlertMessage(i18next.t('alert.message.pswTooShort'));
        return false;
    }
    if (props.password !== props.comfirmPassword) {
        AlertMessage(i18next.t('validateMessage.passwordNotMatch'));
        return false;
    }
    return true;
};

export const validatePhoneNumber = (phone: string) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    if (phone.trim() === '') {
        return false;
    }
    if (!re.test(phone)) {
        return false;
    }
    return true;
};

export const validKatakana = (text: string) => {
    return regexKatakana.test(text);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validatePhoneWithLength = (phone: string, lengthPhone = staticValue.LENGTH_PHONE) => {
    // return validatePhoneNumber(phone);
    // de test release voi phone length != 11
    return validatePhoneNumber(phone) && (__DEV__ ? true : phone.length === lengthPhone);
};

export const includeWord = (str: string, checkEmpty = false) => {
    const newStr = str.trim();
    return !regexNum.test(newStr) && (checkEmpty ? true : !!newStr);
};

export const isUrl = (str = '') => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    );
    return !!pattern.test(str.trim());
};

export const addHttp = (str: string) => {
    const includeHttp = str.includes('http');
    return includeHttp ? str : `http://${str}`;
};
