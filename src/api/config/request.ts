import axios from 'axios';
import Config from 'react-native-config';
import TokenProvider from 'utilities/authenticate/TokenProvider';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';
import { apiLogger } from 'utilities/logger';
import { staticValue } from 'feature/staticData';

const AUTH_URL_REFRESH_TOKEN = `${Config.API_URL}/auth/request-access-token`;

const request = axios.create({
    baseURL: Config.API_URL,
    timeout: 8000,
    headers: { Accept: '*/*' },
});
// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

request.interceptors.request.use(
    async (config: any) => {
        // Do something before api is sent
        const token = TokenProvider.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        // Do something with api error
        apiLogger(
            `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    (response: any) => response.data,
    async (error: any) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {};
        const { data } = response || {};
        const { errorMessage, errorKey } = data || {};
        apiLogger(
            `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        const originalRequest = error.config;
        if (errorKey === 'Refresh_Token_Expire' || errorKey === 'Member_Not_Exist') {
            logger('Refresh_Token_Expire => logout');
            // logout here
            AuthenticateService.logOut();
            return Promise.reject(errorMessage || staticValue.DEFAULT_ERROR_MESSAGE);
        }
        if (
            ((error.response && error.response.status === 401) || errorKey === 'Token_Expired') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                try {
                    const queuePromise: any = await new Promise((resolve: any, reject: any) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers.Authorization = `Bearer ${queuePromise.token}`;
                    return request(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            logger('refreshing token...');
            originalRequest.retry = true;
            isRefreshing = true;
            const localRefreshToken = TokenProvider.getRefreshToken();
            try {
                const refreshTokenResponse = await axios.post(AUTH_URL_REFRESH_TOKEN, {
                    refreshToken: localRefreshToken,
                });
                const { token } = refreshTokenResponse.data.data;
                TokenProvider.setAllNewToken(token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                processQueue(null, token);
                return request(originalRequest);
            } catch (err) {
                logger('Refresh Token Failed: ', false, err);
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        error.message = errorMessage || staticValue.DEFAULT_ERROR_MESSAGE;
        error.keyMessage = errorKey || '';
        return Promise.reject(error.message);
    },
);

export default request;
