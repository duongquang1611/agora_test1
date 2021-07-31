import ActionType from './types';

export const updateBlacklist = (data: any): any => {
    return {
        type: ActionType.UPDATE_BLACKLIST,
        data,
    };
};
