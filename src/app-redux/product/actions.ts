import ActionType from './types';

export const updateImage = (data: any): any => {
    return {
        type: ActionType.UPDATE_IMAGE,
        data,
    };
};
export const deleteProduct = (): any => {
    return {
        type: ActionType.DELETE_PRODUCT,
    };
};
export const updateCategory = (data: any): any => {
    return {
        type: ActionType.UPDATE_CATEGORY,
        data,
    };
};
export const updateBrand = (data: any): any => {
    return {
        type: ActionType.UPDATE_BRAND,
        data,
    };
};

export const tempAction = null;
