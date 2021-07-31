import ActionType from './types';

export const updateNotification = (data: any): any => {
    return {
        type: ActionType.UPDATE_NOTIFICATION,
        data,
    };
};
