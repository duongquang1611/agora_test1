import { AxiosRequestConfig } from 'axios';
import request from 'api/config/request';
import { store } from 'app-redux/store';
import { setUserInfo, logOutUser } from 'app-redux/userInfo/actions';
import { logger } from 'utilities/helper';
import { getProfile, login } from 'api/modules/api-app/authenticate';
import { useState } from 'react';
import AlertMessage from 'components/base/AlertMessage';
import { updateCommon } from 'app-redux/common/actions';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';
export interface LoginRequestParams extends AxiosRequestConfig {
    phone: string;
    code: string;
    setIsError(value: boolean): void;
}

interface LoginRequest {
    loading: boolean;
    requestLogin: (values: LoginRequestParams) => Promise<void>;
}

export const isLogin = () => {
    const { userInfo } = store.getState();
    return !!userInfo?.token;
};

const AuthenticateService = {
    refreshToken: (inputRefreshToken: string) =>
        request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: inputRefreshToken,
        }),
    logOut: () => {
        store.dispatch(
            updateCommon({
                typeInviteCode: '',
                showTerms: true,
                selectedKen: false,
            }),
        );
        store.dispatch(logOutUser());
    },
    handlerLogin: (user: any) => {
        const saveUserInfor = setUserInfo(user);
        store.dispatch(saveUserInfor);
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const requestLogin = async (options: LoginRequestParams) => {
        const { setIsError } = options;
        try {
            setLoading(true);
            const response = await login(options);
            setLoading(false);
            const signInAction = setUserInfo(response?.data);
            store.dispatch(signInAction);
            const userResponse = await getProfile();
            AuthenticateService.handlerLogin({
                ...response?.data,
                user: userResponse?.data,
            });
        } catch (e) {
            setLoading(false);
            AlertMessage(e);
            logger(e);
            setIsError(true);
        }
    };

    return {
        loading,
        requestLogin,
    };
};

export default AuthenticateService;
