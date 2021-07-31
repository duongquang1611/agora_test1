/* eslint-disable no-useless-concat */
import request from './config/request';
import { HOME_URL } from './config/urls';

export const getListProduct = ({ params }: any) => request.get(HOME_URL.getListProduct, { params });

export const getStatusTransaction = () => request.get(HOME_URL.getStatusTransaction);
