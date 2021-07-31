/* eslint-disable no-useless-concat */
import request from './config/request';
import { OFFER_URL } from './config/urls';

export const updateStatusOffer = (offerId: number, transactionId: number, status: number) =>
    request.put(OFFER_URL.updateStatusOffer(offerId), { transactionId, status });

export const getListOffer = (transactionId: number) => {
    return request.get(OFFER_URL.listOffer(transactionId));
};

export const claimPayment = (offerId: number) => {
    return request.get(OFFER_URL.claim(offerId));
};
