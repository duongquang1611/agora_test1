/* eslint-disable no-useless-concat */
import request from './config/request';
import { ACCOUNT_URL } from './config/urls';

export const getOtpChangePhone = (phone: string) => request.post(ACCOUNT_URL.getOtpChangePhone, { phone });
export const verifyOtpChangePhone = (phone: string, code: string) =>
    request.put(ACCOUNT_URL.verifyOtpChangePhone, { phone, code });
export const updateAddress = (data: any) => request.put(ACCOUNT_URL.updateAddress, data);
export const updateAccountBank = (data: any) => request.put(ACCOUNT_URL.updateAccountBank, data);
export const updateIDCard = (data: any) => request.put(ACCOUNT_URL.updateIDCard, data);
