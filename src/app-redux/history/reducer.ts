import ActionType from './types';

const initialState: any = {
    pending: [],
    sentAndDone: [],
    notSell: [],
    isEmpty: false,
};

const History = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.UPDATE_HISTORY:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default History;
