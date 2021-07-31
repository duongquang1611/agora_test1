import ActionType from './types';

export const updateHistory = (data: any): any => {
    return {
        type: ActionType.UPDATE_HISTORY,
        data,
    };
};
