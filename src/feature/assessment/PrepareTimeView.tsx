import { closeTransaction, getTransactionById } from 'api/assessment';
import { getStatusTransaction } from 'api/home';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { EventSocket, staticValue, TYPE_REVIEW } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import useRecursiveTimeout from 'hooks/useRecursiveTimeout';
import { ASSESSMENT_ROUTE, HISTORY_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { countTime } from 'utilities/convert';
import { logger } from 'utilities/helper';
import { socket } from 'utilities/SocketProvider';
import ConfirmVideoCallView from './components/ConfirmVideoCallView';

let timeValue = 0;
let isShowConfirm = false;
let isShowClose = false;
let isShowRefuse = false;

const PrepareTimeView = (data: any) => {
    const { route } = data;
    const { params } = route;
    const ref = useRef<any>(null);
    const modal = useModal(false);
    const [stopTime, setStopTime] = useState(false);
    const [timeCountdown, setTimeCountdown] = useState<any>();
    const [showTimeout, setShowTimeout] = useState(false);
    const [dataTransaction, setDataTransaction] = useState({
        transactionId: '',
        conversationId: '',
    });
    const [agoraData, setAgoraData] = useState({
        token: '',
        channelName: '',
        uid: '',
        agoraAppId: staticValue.AGORA_APP_ID,
    });
    const { focusScreen = '' } = useSelector((state: any) => state.blacklist);
    const { ALL_TRANSACTION_STATUS } = staticValue;
    const hasAgora = !Object.values(agoraData).includes('');
    const hasConversation = !Object.values(dataTransaction).includes('');
    const now = new Date().getTime();
    const timeWaiting = new Date(params.timeCount).getTime();
    const timeDiff = Math.round((timeWaiting - now) / staticValue.ONE_SECOND);
    const [adminCancel, setAdminCancel] = useState(false);
    const [dataClose, setDataClose] = useState<any>();
    const [dataRefuse, setDataRefuse] = useState<any>();
    timeValue = timeDiff > staticValue.TIME_WAIT_ADMIN ? staticValue.TIME_WAIT_ADMIN : timeDiff;

    const onCloseTransaction = async (transactionId: number) => {
        try {
            modal.dismissAll();
            const result = await closeTransaction(transactionId);
            if (result) {
                goBack();
            }
        } catch (err) {
            logger(err);
            AlertMessage(err);
            return true;
        }
        return true;
    };

    useBackHandler();

    const dismissModal = () => {
        modal.dismiss();
        navigate(HISTORY_ROUTE.ROOT);
    };
    useEffect(() => {
        ref?.current?.animate?.(staticValue.VALUE_PROGRESS, staticValue.TIME_PROGRESS);
        return () => {
            timeValue = timeDiff;
            setStopTime(true);
        };
    }, [stopTime]);
    useEffect(() => {
        if (focusScreen === ASSESSMENT_ROUTE.PREPARE_TIME) {
            if (dataClose && !isShowClose) {
                isShowClose = true;
                modal.dismiss();
                showModalSuccess(dataClose?.message || 'common.adminCompleteTransaction');
            }
            if (dataRefuse && !isShowRefuse) {
                setAdminCancel(true);
                isShowRefuse = true;
                modal.dismiss();
                showModalSuccess(dataRefuse?.content || dataRefuse?.contentRefused, refuseTransaction);
            }
            if (showTimeout) {
                modal.dismiss();
                showModalSuccess('common.timeOutPrepare');
            }
        }
    }, [dataClose, dataRefuse, focusScreen, showTimeout]);
    useEffect(() => {
        socket.on('reconnect', () => {
            reconnectPrepare();
        });
        socket.off(EventSocket.CREATE_ROOM);
        socket.on(EventSocket.CREATE_ROOM, (dataSocket: any) => {
            logger('dataTransaction; ', undefined, {
                transactionId: params.transactionId,
                conversationId: dataSocket.conversationId,
            });
            setStopTime(true);
            if (dataSocket) {
                setDataTransaction({
                    transactionId: params.transactionId,
                    conversationId: dataSocket.conversationId,
                });
            }
        });
        socket.off(EventSocket.VIDEO_CALL);
        socket.on(EventSocket.VIDEO_CALL, (socketVideoCall: any) => {
            setStopTime(true);
            setAgoraData({
                token: socketVideoCall?.agoraToken,
                channelName: socketVideoCall?.channelName,
                uid: socketVideoCall?.uid,
                agoraAppId: staticValue.AGORA_APP_ID,
            });
        });
        socket.off(EventSocket.REFUSE_TRANSACTION);
        socket.on(EventSocket.REFUSE_TRANSACTION, (socketRefuse: any) => {
            setDataRefuse(socketRefuse);
        });
        socket.off(EventSocket.CLOSE_TRANSACTION);
        socket.on(EventSocket.CLOSE_TRANSACTION, (dataCloseSocket: any) => {
            setDataClose(dataCloseSocket);
        });
        return () => {
            isShowConfirm = false;
            isShowClose = false;
            isShowRefuse = false;
            socket.off('reconnect');
            modal.dismiss();
            socket.off(EventSocket.CREATE_ROOM);
            socket.off(EventSocket.VIDEO_CALL);
            socket.off(EventSocket.REFUSE_TRANSACTION);
            socket.off(EventSocket.CLOSE_TRANSACTION);
        };
    }, []);
    useEffect(() => {
        if (hasConversation) {
            params.typeReview === TYPE_REVIEW.CHAT
                ? navigate(ASSESSMENT_ROUTE.CONVERSATION, { dataTransaction })
                : hasAgora && showModalConfirm();
        }
    }, [dataTransaction, agoraData]);

    const showModalSuccess = (title = '', onPress = dismissModal) => {
        modal.show({
            children: <ModalSuccess title={title} onPressIcon={onPress} />,
            onBackdropPress: onPress,
        });
    };

    const showModalConfirm = () => {
        !isShowConfirm &&
            modal.show({
                children: (
                    <ConfirmVideoCallView
                        onClose={() => {
                            modal.dismiss();
                            navigate(ASSESSMENT_ROUTE.VIDEO_CALL_VIEW, { dataTransaction, agoraData });
                        }}
                    />
                ),
            });
        isShowConfirm = true;
    };

    const reconnectPrepare = async () => {
        const transactionAppraising = await getStatusTransaction();
        const detailTransaction = await getTransactionById(params.transactionId);
        if (transactionAppraising.data) {
            if (transactionAppraising?.data?.conversation) {
                setDataTransaction({
                    transactionId: transactionAppraising?.data.id,
                    conversationId: transactionAppraising?.data.conversation.conversationMember.conversationId,
                });
                if (params.typeReview === TYPE_REVIEW.VIDEO) {
                    setAgoraData({
                        token: transactionAppraising?.data.conversation.conversationMember.agoraToken,
                        channelName: transactionAppraising?.data.conversation.channelName,
                        uid: transactionAppraising?.data.conversation.conversationMember.uid,
                        agoraAppId: staticValue.AGORA_APP_ID,
                    });
                }
            }
        } else {
            detailTransaction?.data?.status === ALL_TRANSACTION_STATUS.CANCEL
                ? setDataRefuse(detailTransaction?.data?.product)
                : detailTransaction?.data?.status === ALL_TRANSACTION_STATUS.TIME_OUT
                ? setShowTimeout(true)
                : setDataClose(detailTransaction);
        }
    };

    useRecursiveTimeout(
        async () => {
            timeValue -= 1;
            setTimeCountdown(countTime(timeValue));
            if (countTime(timeValue) === staticValue.TIME_OFF || timeDiff <= staticValue.NO_VALUE) {
                setStopTime(true);
            }
        },
        !stopTime ? staticValue.FILL_PROGRESS : null,
    );

    const refuseTransaction = () => {
        modal.dismiss(undefined, () => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT));
    };
    return (
        <View style={styles.container}>
            {!hasConversation && !hasAgora && !adminCancel && (
                <>
                    <StyledHeader title={''} onPressBack={() => onCloseTransaction(params.transactionId)} />
                    <View style={styles.viewClock}>
                        <StyledIcon
                            source={Images.icons.assessment.iconClock}
                            customStyle={styles.iconClock}
                            size={44}
                        />
                        <StyledText
                            customStyle={styles.textClock}
                            i18nText={stopTime ? 'assessment.clockStop' : 'assessment.clock'}
                        />
                    </View>
                    <AnimatedCircularProgress
                        ref={ref}
                        size={staticValue.SIZE_PROGRESS}
                        width={15}
                        fill={staticValue.FILL_PROGRESS}
                        tintColor={Themes.COLORS.assessment.progressActive}
                        backgroundColor={Themes.COLORS.assessment.progress}
                        style={styles.progress}
                        rotation={staticValue.ROTATE_PROGRESS}
                    >
                        {() => (
                            <StyledText
                                customStyle={styles.textTime}
                                originValue={timeDiff <= staticValue.NO_VALUE ? staticValue.TIME_OFF : timeCountdown}
                            />
                        )}
                    </AnimatedCircularProgress>
                    <StyledText
                        customStyle={styles.textNote}
                        i18nText={stopTime ? 'assessment.noteTimeStop' : 'assessment.noteTime'}
                    />
                </>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    viewClock: {
        flexDirection: 'row',
        marginTop: '64@vs',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    iconClock: {},
    textClock: {
        fontSize: 18,
        marginLeft: 14,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
    },
    textTime: {
        textAlign: 'center',
        fontSize: 40,
        alignSelf: 'center',
    },
    textNote: {
        fontSize: 14,
        marginTop: 42,
        color: Themes.COLORS.textSecondary,
        lineHeight: 21,
        textAlign: 'center',
    },
    progress: {
        alignSelf: 'center',
        marginTop: '64@vs',
    },
});
export default PrepareTimeView;
