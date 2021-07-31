import ActionType from './types';

const initialState: any = {};

const resource = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ActionType.UPDATE_RESOURCE:
            return { ...state, ...action.data };
        default:
            return state;
    }
};
export default resource;
