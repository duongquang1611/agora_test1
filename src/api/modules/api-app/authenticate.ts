import request from 'api/config/request';
import { LoginRequestParams } from 'utilities/authenticate/AuthenticateService';

export const getProfile = () => request.get(`members/profile`);

export const verifyRegistrationCode = (code: string) => request.post(`auth/verify-registration-code`, { code });
export const getVerifyCodeLogin = (phone: string, code: string, type: number) =>
    request.post(`auth/request-verification-code`, { phone, code, type });
export const login = ({ phone, code }: LoginRequestParams) => request.post(`auth/verify-code`, { phone, code });
export const register = (params: any) => request.post(`auth/register`, params);
export const forgotPassword = (email: string) => request.post(`auth/forgot-password`, { email });
export const checkIsExistEmail = (email: string) => request.post(`auth/check-account-existed`, { email });
export const getVerifyCode = (email: string) => request.post(`auth/request-verified-code`, { email });
export const checkVerifyCode = (email: string, verifiedCode: string) =>
    request.post(`auth/check-verified-code`, { email, verifiedCode });
export const resetPassword = (email: string, newPassword: string, verifiedCode: number) =>
    request.post(`auth/reset-password`, { email, newPassword, verifiedCode });
