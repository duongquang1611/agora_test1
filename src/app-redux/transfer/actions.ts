import ActionType from './types';

export const updateTransfer = (data: any): any => {
    return {
        type: ActionType.UPDATE_TRANSFER,
        data,
    };
};
