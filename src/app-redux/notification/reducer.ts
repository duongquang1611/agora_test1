import ActionType from './types';

const initialState: any = {
    totalNotification: 0,
    allNotification: 0,
    personalNotification: 0,
    isRefreshNotification: false,
};

const notification = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.UPDATE_NOTIFICATION:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default notification;
