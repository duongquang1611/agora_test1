import ActionType from './types';

const initialState: any = {
    id: '',
    bankId: '',
    accountType: '',
    branchCode: '',
    accountNumber: '',
    accountFirstName: '',
    accountLastName: '',
};

const Transfer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.UPDATE_TRANSFER:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default Transfer;
