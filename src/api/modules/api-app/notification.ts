import request from 'api/config/request';
import { NOTIFICATION } from 'api/config/urls';

export const notificationCheck = () => request.get(`notification`);
export const notificationRead = (id: number) => request.put(`notification/read/${id}`);
export const getListNotification = ({ params }: any) => request.get(NOTIFICATION.getListNotification, { params });
export const updateIsReadNotification = (id: number) => request.put(`/notifications/${id}/update-is-read-notification`);
export const updateEnableNotification = (enableNotification: number) =>
    request.put(NOTIFICATION.updateEnableNotification, { enableNotification });
export const updateEnableNotificationShip = (enableNotificationShip: number) =>
    request.put(NOTIFICATION.updateEnableNotificationShip, { enableNotificationShip });

export const getTotalNotification = () => request.get(NOTIFICATION.totalNotification);
