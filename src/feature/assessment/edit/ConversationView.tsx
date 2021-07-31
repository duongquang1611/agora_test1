/* eslint-disable no-underscore-dangle */
import { useNavigation } from '@react-navigation/native';
import { closeTransaction, updateStatus } from 'api/assessment';
import { updateBlacklist } from 'app-redux/blacklist/actions';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledIcon, StyledImage, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import ShowAlertMessage from 'components/common/ShowAlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { EventSocket, NAVIGATE_TYPE, OFFER_STATUS, staticValue, TAB_HISTORY_TRANSACTION } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import useTakePhoto from 'hooks/useTakePhoto';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next/';
import { Keyboard, View } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { Actions, Bubble, Composer, ComposerProps, GiftedChat, Send } from 'react-native-gifted-chat';
import { ScaledSheet } from 'react-native-size-matters';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { useDispatch, useSelector } from 'react-redux';
import { formatOffer } from 'utilities/convert';
import { countJoinFunction, isIos, logger } from 'utilities/helper';
import { socket, useSocket } from 'utilities/SocketProvider';
import ModalAgreeOffer from '../components/ModalAgreeOffer';
import ModalOfferView from '../components/ModalOfferView';
import ModalTutorialShip from '../components/ModalTutorialShip';

let isClose = false;
const ConversationView = (data: any) => {
    useBackHandler();
    const { focusScreen = '' } = useSelector((state: any) => state.blacklist);
    const modal = useModal(false);
    const { route } = data;
    const dispatch = useDispatch();
    const { dataTransaction = {} } = route?.params || {};
    const { t } = useTranslation();
    const { showModalPhoto, imageProduct } = useTakePhoto();
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [isOfferSuccess, setIsOfferSuccess] = useState(false);
    const refChat = useRef<any>(null);
    const {
        onSend,
        messages,
        leaveRoom,
        setImage,
        loading,
        dataClose,
        setDataClose,
        offerPending,
        setOfferPending,
        startTyping,
        endTyping,
        isAdminTyping,
    } = useSocket(dataTransaction?.conversationId?.toString(), dataTransaction?.transactionId);
    const [countJoinSuccess, setCountJoinSuccess] = useState<any>();
    useEffect(() => {
        !isIos && AndroidKeyboardAdjust.setAdjustResize();
        return () => {
            modal.dismiss();
            leaveRoom();
            isClose = false;
        };
    }, []);
    useEffect(() => {
        if (dataClose && !isClose && focusScreen === ASSESSMENT_ROUTE.CONVERSATION) {
            isClose = true;
            Keyboard.dismiss();
            modal.dismiss();
            modal.show({
                children: (
                    <ModalSuccess
                        title={dataClose?.message || 'common.adminCompleteTransaction'}
                        onPressIcon={dismissModal}
                    />
                ),
                onBackdropPress: dismissModal,
            });
        }
        return () => {
            modal.dismiss();
        };
    }, [dataClose, focusScreen]);
    useEffect(() => {
        if (offerPending && focusScreen === ASSESSMENT_ROUTE.CONVERSATION) {
            const DATA_OFFER = formatOffer(offerPending);
            Keyboard.dismiss();
            modal.dismiss();
            modal.show({
                children: (
                    <ModalOfferView
                        onPressCancel={() => confirmOffer(offerPending, OFFER_STATUS.NO)}
                        onPressOk={() => confirmOffer(offerPending, OFFER_STATUS.YES)}
                        data={DATA_OFFER}
                    />
                ),
            });
        }
        return () => {
            modal.dismiss();
        };
    }, [offerPending, focusScreen]);

    useEffect(() => {
        !!imageProduct?.whole?.URL && setImage(imageProduct?.whole);
    }, [imageProduct?.whole]);

    useEffect(() => {
        socket.off(EventSocket.OFFERS);
        socket.on(EventSocket.OFFERS, (dataSocket: any) => {
            setOfferPending(dataSocket);
        });
        socket.off(EventSocket.CLOSE_TRANSACTION);
        socket.on(EventSocket.CLOSE_TRANSACTION, (dataCloseSocket: any) => {
            setDataClose(dataCloseSocket);
        });
    }, [countJoinSuccess]);
    useEffect(() => {
        text ? startTyping() : endTyping();
    }, [Boolean(text)]);
    const dismissModal = () => {
        modal.dismiss(undefined, () => {
            handleCloseConversation();
        });
    };
    const confirmOffer = async (offer: any, statusOffer: number) => {
        const dataSocket = {
            transactionId: offer.transactionId,
            status: statusOffer,
        };
        try {
            const result = await updateStatus(dataSocket, offer.id);
            if (result && statusOffer === OFFER_STATUS.YES) {
                dispatch(updateBlacklist({ dataOffer: offer }));
                setIsOfferSuccess(true);
                const countModalShip = await countJoinFunction(staticValue.KEY_OFFER_SUCCESS);
                setCountJoinSuccess(countModalShip);
                modal.dismiss(undefined, () => {
                    modal.show({
                        children: <ModalAgreeOffer />,
                    });
                    setTimeout(() => {
                        // if (Number(countModalShip) <= staticValue.DEFAULT_VALUE && !isClose) {
                        modal.dismiss(undefined, () => {
                            modal.show({
                                children: <ModalTutorialShip modal={modal} />,
                            });
                        });
                        // }
                        // else {
                        //     isClose ? null : modal.dismiss();
                        // }
                    }, staticValue.TIME_OFF_OFFER);
                });
            } else {
                modal.dismiss();
                setIsOfferSuccess(false);
            }
        } catch (err) {
            logger(err);
            AlertMessage(err);
        }
    };
    const renderBubble = (props: any) => {
        const { currentMessage = {} } = props;
        if (currentMessage?.messageType === staticValue.TYPE_MESSAGE_IMAGE) {
            const dataImage = {
                URL: currentMessage?.image || '',
                URL50x50: currentMessage?.image50x50 || '',
                URL400x400: currentMessage?.image400x400 || '',
            };
            return (
                <View style={styles.messageImageContainer}>
                    <ProgressiveImage {...dataImage} style={styles.messageImage} />
                </View>
            );
            // return <StyledFastImage source={{ uri: props?.currentMessage.image }} customStyle={styles.messageImageContainer} />;
        }
        if (currentMessage?.messageType === staticValue.TYPE_MESSAGE_OFFER) {
            return null;
        }
        return (
            <View>
                <Bubble
                    {...props}
                    onLongPress={() => null}
                    wrapperStyle={{
                        left: styles.wrapBubbleLeft,
                        right: styles.wrapBubbleRight,
                    }}
                    textStyle={{
                        left: styles.colorTxt,
                        right: styles.colorTxtRight,
                    }}
                    containerStyle={styles.contentContainer}
                />
                <StyledIcon
                    source={Images.icons.assessment.iconAssign}
                    size={20}
                    customStyle={currentMessage?.user?._id === 2 ? styles.iconAssignUser : styles.iconAssign}
                />
            </View>
        );
    };

    const renderComposer = (props: ComposerProps) => {
        return (
            <Composer
                {...props}
                textInputStyle={styles.input}
                multiline
                placeholder={t('assessment.conversation.placeHolder')}
            />
        );
    };

    const renderSend = (props: any) => {
        return (
            <Send {...props} disabled={!props.text.trim().length} containerStyle={styles.send}>
                <StyledImage
                    source={
                        text.trim().length ? Images.icons.assessment.iconSendActive : Images.icons.assessment.iconSend
                    }
                    resizeMode="contain"
                    customStyle={styles.icSendMessage}
                />
            </Send>
        );
    };

    const renderActions = (props: any) => {
        return (
            <Actions
                {...props}
                containerStyle={styles.actions}
                icon={() => (
                    <StyledTouchable
                        customStyle={styles.iconsActions}
                        onPress={() => {
                            showModalPhoto(0);
                        }}
                    >
                        <StyledImage
                            source={Images.icons.assessment.iconPhoto}
                            resizeMode="contain"
                            customStyle={styles.icSelectedImage}
                        />
                    </StyledTouchable>
                )}
            />
        );
    };
    const onCloseConversation = () => {
        modal.show({
            children: (
                <ShowAlertMessage
                    title={'assessment.conversation.cancelConversation'}
                    message={''}
                    messageCancel={'assessment.conversation.cancelClose'}
                    messageConfirm={'assessment.conversation.confirmClose'}
                    onCancel={cancelCloseConversation}
                    onConfirm={confirmCloseConversation}
                />
            ),
        });
    };
    const cancelCloseConversation = () => {
        modal.dismiss();
    };
    const confirmCloseConversation = () => {
        modal.dismiss(undefined, async () => {
            try {
                await closeTransaction(dataTransaction?.transactionId);
            } catch (err) {
                logger(err);
            } finally {
                handleCloseConversation();
            }
        });
    };

    const handleCloseConversation = async () => {
        isOfferSuccess
            ? navigate(
                  Number(countJoinSuccess) <= staticValue.DEFAULT_VALUE
                      ? ACCOUNT_ROUTE.ADDRESS
                      : ASSESSMENT_ROUTE.CONFIRM_TRANSFER,
                  { navigateFrom: NAVIGATE_TYPE.VIDEO_AND_CHAT },
              )
            : navigation.navigate(TAB_NAVIGATION_ROOT.HISTORY_ROUTE.ROOT, {
                  initPage: TAB_HISTORY_TRANSACTION.PENDING_SHIP,
              });
    };

    const onContentSizeChange = () => {
        !isAdminTyping && refChat?.current?.scrollToBottom?.();
    };
    return (
        <View style={styles.container}>
            <StyledOverlayLoading visible={loading} />
            <StyledHeader
                title={'assessment.conversation.title'}
                hasBack={false}
                iconRight={Images.icons.close}
                onPressRight={onCloseConversation}
            />
            <GiftedChat
                ref={refChat}
                messages={messages}
                keyboardShouldPersistTaps={'never'}
                text={text}
                onInputTextChanged={setText}
                onSend={onSend}
                listViewProps={{
                    contentContainerStyle: styles.styleListView,
                    onContentSizeChange,
                }}
                scrollToBottom={false}
                renderBubble={renderBubble}
                bottomOffset={
                    isIos
                        ? StaticSafeAreaInsets.safeAreaInsetsBottom - 20
                        : StaticSafeAreaInsets.safeAreaInsetsBottom - 60
                }
                renderComposer={renderComposer}
                renderSend={renderSend}
                renderActions={renderActions}
                alwaysShowSend
                renderTime={() => null}
                renderDay={() => null}
                renderAvatar={() => null}
                isTyping={isAdminTyping}
                user={{
                    _id: staticValue.ID_USER,
                }}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    actions: {
        width: '47@s',
        height: '44@vs',
        justifyContent: 'center',
        marginBottom: 0,
    },
    iconsActions: {
        flexDirection: 'row',
    },
    icSelectedImage: {
        width: '24@s',
        height: '24@s',
        marginLeft: '5@s',
        tintColor: Themes.COLORS.bottomTab.camera,
    },
    icSendMessage: {
        width: '20@s',
        height: '20@s',
    },
    send: {
        width: '44@s',
        height: '44@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        color: Themes.COLORS.black,
        backgroundColor: Themes.COLORS.assessment.chat.input,
        borderRadius: 30,
        paddingTop: '8.5@s',
        paddingHorizontal: '12@s',
        marginLeft: 0,
        marginRight: '5@s',
        fontSize: 14,
        width: '281@s',
        height: '34@vs',
    },
    contentContainer: {},
    colorTxt: {
        color: Themes.COLORS.black,
        paddingVertical: 10,
        borderRadius: 20,
    },
    colorTxtRight: {
        color: Themes.COLORS.white,
        paddingVertical: 10,
        borderRadius: 20,
    },
    wrapBubbleLeft: {
        backgroundColor: Themes.COLORS.assessment.chat.viewMessage,
        borderRadius: 20,
        marginTop: 10,
        maxWidth: '270@s',
    },
    wrapBubbleRight: {
        backgroundColor: Themes.COLORS.secondary,
        marginTop: 10,
        borderRadius: 20,
        marginRight: 10,
        maxWidth: '270@s',
    },
    iconAssignUser: {
        position: 'absolute',
        right: 12,
        bottom: -10,
        transform: [{ rotate: '-90deg' }],
        tintColor: Themes.COLORS.secondary,
    },
    iconAssign: {
        position: 'absolute',
        bottom: -10,
        left: -2,
    },
    styleListView: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageImageContainer: {
        width: '100@s',
        height: '120@vs',
        marginTop: '20@vs',
        marginRight: '15@s',
    },
    messageImage: {},
});
export default ConversationView;
