import request from './config/request';
import { MASTER_DATA_URL } from './config/urls';

export const apiResource = {
    init: () => request.get(MASTER_DATA_URL.getAll),
    getAddressByPostCode: (params: any) => request.get(MASTER_DATA_URL.getAddressByPostCode, { params }),
    getBanks: (keyword: string) => request.get(MASTER_DATA_URL.getBanks(keyword)),
    getBrands: (keyword: string) => request.get(MASTER_DATA_URL.getBrands(keyword)),
};
