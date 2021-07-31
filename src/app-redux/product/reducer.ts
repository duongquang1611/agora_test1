import ActionType from './types';

const initialState: any = {
    arrayImage: [],
    category: '',
    brand: '',
};

const product = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ActionType.UPDATE_IMAGE:
            return { ...state, arrayImage: action.data };
        case ActionType.UPDATE_CATEGORY:
            return { ...state, category: action.data };
        case ActionType.UPDATE_BRAND:
            return { ...state, brand: action.data };
        case ActionType.DELETE_PRODUCT:
            return { ...state, arrayImage: [] };
        default:
            return state;
    }
};
export default product;
