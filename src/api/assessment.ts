import request from './config/request';
import { ASSESSMENT_URL } from './config/urls';

export const addProduct = (params: any) => request.post(ASSESSMENT_URL.addProduct, params);

export const createTransaction = (params: any) => request.post(ASSESSMENT_URL.createTransaction, params);

export const sendMessage = (params: any) => request.post(ASSESSMENT_URL.sendMessage, params);

export const updateStatus = (params: any, offerId: any) => request.put(`/offers/${offerId}`, params);

export const closeTransaction = (transactionId: number) =>
    request.put(`/transactions/${transactionId}/close-transaction`);

export const getTransactionById = (transactionId: any) => request.get(`/transactions/${transactionId}`);

export const getAllListMessage = (id: number) => request.post(`/conversations/list-messages/${id}`);
