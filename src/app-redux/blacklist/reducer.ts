import ActionType from './types';

const initialState: any = {
    showIntro: false,
    bankSelected: null,
    accountTypeSelected: null,
    transferTemp: undefined,
    addressTemp: undefined,
    dataOffer: {},
    focusScreen: '',
    openingNotify: false,
};

const Blacklist = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.UPDATE_BLACKLIST:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default Blacklist;
