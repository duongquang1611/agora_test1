const MASTER_DATA_URL = {
    getAll: 'resources/all-resource',
    getAddressByPostCode: 'resources/get-postcode',
    getBanks: (keyword: string) => `resources/list-banks?take=1000&pageIndex=1&keyword=${keyword}`,
    getBrands: (keyword: string) => `resources/list-brands?take=1000&pageIndex=1&keyword=${keyword}`,
};

const HOME_URL = {
    getListProduct: 'products/',
    getStatusTransaction: '/transactions/transaction-appraising',
};

const ASSESSMENT_URL = {
    addProduct: '/products/',
    createTransaction: '/transactions/',
    sendMessage: '/conversations/send-message',
    getTransactionById: '/transactions/',
    getListMessage: '/conversations/list-messages/',
};

const ACCOUNT_URL = {
    getOtpChangePhone: 'members/request-verify-update-phone',
    verifyOtpChangePhone: 'members/verify-OTP-code-and-change-phone',
    updateAddress: 'members/update-address',
    updateAccountBank: 'members/update-account-bank',
    updateIDCard: 'members/update-ID-card',
};

const OFFER_URL = {
    updateStatusOffer: (offerId: string | number) => `/offers/${offerId}`,
    listOffer: (transactionId: number) => `/offers/${transactionId}/list-offer-by-transaction-id`,
    claim: (offerId: number) => `/offers/${offerId}/claim-payment`,
};

const HISTORY_URL = {
    getListTransaction: 'transactions/?status=',
    saveParcelCodeTransaction: (transactionId: number) => `transactions/${transactionId}/save-parcel-code`,
};

const NOTIFICATION = {
    getListNotification: '/notifications/',
    updateEnableNotification: '/notifications/update-enable-notification',
    updateEnableNotificationShip: '/notifications/update-enable-notification-ship',
    totalNotification: '/notifications/count-notify-unread',
};
export { MASTER_DATA_URL, HOME_URL, ACCOUNT_URL, HISTORY_URL, ASSESSMENT_URL, OFFER_URL, NOTIFICATION };
