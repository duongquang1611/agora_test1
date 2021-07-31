/* eslint-disable no-useless-concat */
import request from './config/request';
import { HISTORY_URL } from './config/urls';

export const getTransactionList = ({ params }: any) => request.get(HISTORY_URL.getListTransaction + params?.status);
export const saveParcelCode = (parcelCode: string, transactionId: number) =>
    request.put(HISTORY_URL.saveParcelCodeTransaction(transactionId), { parcelCode });
