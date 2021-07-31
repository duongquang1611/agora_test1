import ActionType from './types';

const initialState: any = {
    showTutorial: true,
    showTerms: true,
    inviteCode: '',
    countRequestPayment: 0,
    selectedKen: false,
    isShowNotification: false,
};

const Common = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.UPDATE_COMMON:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default Common;
