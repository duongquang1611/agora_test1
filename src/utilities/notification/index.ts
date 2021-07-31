import { getStatusTransaction } from 'api/home';
import { getTotalNotification, updateIsReadNotification } from 'api/modules/api-app/notification';
import { updateNotification } from 'app-redux/notification/actions';
import { store } from 'app-redux/store';
import AlertMessage from 'components/base/AlertMessage';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import { NAVIGATE_TYPE, RedirectType, staticValue } from 'feature/staticData';
import i18next from 'i18next';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE, HISTORY_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';
import { getTransactionById } from '../../api/assessment';

export const enumType = {
    System: 0,
    NewMessage: 1,
    MemberRequest: 2,
    StoreAccept: 3,
    Cancel: 4,
    MemberPaid: 5,
};

export function pushTagMember(id: number | string) {
    OneSignal.sendTag('memberId', `${id}`);
}

export function deleteTagOneSignal() {
    OneSignal.sendTag('memberId', '');
    OneSignal.deleteTag('memberId');
}
const getStatus = async () => {
    let check = false;
    try {
        const dataTransaction = await getStatusTransaction();
        if (dataTransaction?.data) {
            check = true;
        }
    } catch (error) {
        check = false;
    }
    return check;
};

const checkCaseNotify = (data: any, metaData: any) => {
    switch (data?.redirectType) {
        case RedirectType.HOME:
            navigate(TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT, { type: data?.type });
            break;
        case RedirectType.DETAIL_TRANSACTION:
            navigate(HISTORY_ROUTE.DETAIL, {
                transactionId: data?.redirectId,
                navigateFrom: NAVIGATE_TYPE.NOTIFY,
            });
            break;
        case RedirectType.TRANSACTION:
            navigate(HISTORY_ROUTE.DETAIL, {
                transactionId: data?.redirectId,
                navigateFrom: NAVIGATE_TYPE.NOTIFY,
            });
            break;
        case RedirectType.OFFER:
            break;
        case RedirectType.MEMBER_BANK:
            navigate(ASSESSMENT_ROUTE.SELECT_TRANSFER, { navigateFrom: NAVIGATE_TYPE.SETTING });
            break;
        case RedirectType.MEMBER_ID_CARD:
            navigate(ACCOUNT_ROUTE.CHANGE_ID_MENU, { navigateFrom: NAVIGATE_TYPE.SETTING });
            break;
        case RedirectType.SHIP:
            navigate(HISTORY_ROUTE.DETAIL, { transactionId: data?.redirectId, navigateFrom: NAVIGATE_TYPE.NOTIFY });
            break;
        case RedirectType.MEMBER_ADDRESS:
            navigate(ACCOUNT_ROUTE.ADDRESS, { navigateFrom: NAVIGATE_TYPE.SETTING });
            break;
        case RedirectType.UPDATE_PARCEL_CODE:
            navigate(HISTORY_ROUTE.DETAIL, {
                transactionId: data?.redirectId,
                navigateFrom: NAVIGATE_TYPE.NOTIFY,
                autoShowModal: true,
            });
            break;
        case RedirectType.CONVERSATION:
            handleVideoAndChat(data?.redirectId, () => {
                navigate(ASSESSMENT_ROUTE.CONVERSATION, {
                    dataTransaction: {
                        transactionId: data?.redirectId,
                        conversationId: metaData?.conversationId,
                    },
                });
            });
            break;
        case RedirectType.VIDEO_CALL:
            handleVideoAndChat(data?.redirectId, () => {
                logger('Handle notify video call');
            });
            break;
        case RedirectType.REFUSED_TRANSACTION:
            break;
        default:
            break;
    }
};
export async function onMoveNavigation(data: any) {
    if (data) {
        let metaData: any = {};
        if (data?.metaData) {
            metaData = typeof data.metaData === 'string' ? JSON.parse(data?.metaData) : data.metaData;
        }
        try {
            await updateIsReadNotification(data?.notificationId);
            getNotificationInRead();
            checkCaseNotify(data, metaData);
        } catch (error) {
            logger(error);
        }
    }
}
const handleVideoAndChat = async (transactionId: number, callback?: any) => {
    try {
        const status = await getStatus();
        const detailTransaction = await getTransactionById(transactionId);
        if (detailTransaction?.data?.status === staticValue.ALL_TRANSACTION_STATUS.APPRAISING) {
            callback?.();
        } else {
            AlertMessage(i18next.t('common.closeTransaction'), '', () => {
                !status && navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT);
            });
        }
    } catch (error) {
        logger(error);
    }
};
export function handleNavigateNotification(data: any) {
    logger('open', undefined, data);
    const modal = ModalizeManager();
    modal.dismiss(1);
    if (isLogin()) {
        const payload = data?.notification?.payload?.additionalData;
        onMoveNavigation(payload);
    }
}

async function onReceived(data: any) {
    logger('onReceived', undefined, data);
    getNotificationInRead();
}

const getNotificationInRead = async () => {
    try {
        const total = await getTotalNotification();
        const { isRefreshNotification } = store.getState().notification;
        if (total) {
            store.dispatch(
                updateNotification({
                    totalNotification: total?.data?.totalAllNotifiedUnread,
                    allNotification: total?.data?.totalCommonNotifiedUnread,
                    personalNotification: total?.data?.totalPersonNotifiedUnread,
                    isRefreshNotification: !isRefreshNotification,
                }),
            );
        }
    } catch (err) {
        logger(err);
    }
};

export const useOnesignal = (user?: any) => {
    const { isShowNotification } = useSelector((state: any) => state.common);
    const { focusScreen = '' } = useSelector((state: any) => state.blacklist);
    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }
    useEffect(() => {
        if (isShowNotification) {
            try {
                const iosSetting = {
                    kOSSettingsKeyAutoPrompt: true,
                };
                OneSignal.init(Config.ONE_SIGNAL_APP_ID, iosSetting);
                OneSignal.inFocusDisplaying(2); // show notification
                OneSignal.registerForPushNotifications();
                if (isLogin()) {
                    pushTagMember(user?.id);
                } else {
                    deleteTagOneSignal();
                }
                OneSignal.addEventListener('received', onReceived);
                OneSignal.addEventListener('opened', handleNavigateNotification);
            } catch (error) {
                logger(error);
            }
        }
        return () => {
            OneSignal.removeEventListener('received', onReceived);
            OneSignal.removeEventListener('opened', handleNavigateNotification);
        };
    }, [isShowNotification, focusScreen]);
};
