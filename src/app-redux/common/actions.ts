import ActionType from './types';

export const updateCommon = (data: any): any => {
    return {
        type: ActionType.UPDATE_COMMON,
        data,
    };
};
