/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { getAllListMessage, getTransactionById, sendMessage } from 'api/assessment';
import { getStatusTransaction } from 'api/home';
import { getProfile } from 'api/modules/api-app/authenticate';
import { getListOffer } from 'api/offer';
import { EventSocket, OFFER_STATUS, staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { logger } from './helper';

export const socket = io(`${Config.API_SOCKET}?role=app`, { timeout: 3000 });
export const SocketProvider = ({ children }: any) => {
    const userInfo = useSelector((state: any) => state.userInfo);
    async function handleOnConnect() {
        socket.emit('authenticate', { token: userInfo?.token });
        socket.on('unauthorized', async () => {
            await getProfile();
            socket.emit('authenticate', { token: userInfo?.token });
        });
    }
    function startSocket() {
        socket?.disconnect();
        socket.on('connect', () => {
            handleOnConnect();
        });
        socket.on('authenticated', () => {
            logger('connected');
        });
        socket.connect();
    }
    function stopSocket() {
        socket?.off('connect');
        socket?.off('reconnect');
        socket?.off('authenticated');
        socket?.off(EventSocket.MESSAGES);
        socket?.disconnect();
    }
    useEffect(() => {
        if (userInfo?.token) {
            startSocket();
        }
        return () => {
            stopSocket();
        };
    }, [userInfo?.token]);

    return <>{children}</>;
};

export const useSocket = (id?: string, transactionId = 0) => {
    const [conversationId, setConversationId] = useState(id);
    const { userInfo, blacklist } = useSelector((state: any) => state);
    const { focusScreen = '' } = blacklist;
    const [messages, setMessages] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [offerPending, setOfferPending] = useState();
    const [dataClose, setDataClose] = useState<any>();
    const [dataRefuse, setDataRefuse] = useState<any>();
    const [isAdminTyping, setIsAdminTyping] = useState(false);
    // const [isChat, setIsChat] = useState<boolean>(false);
    // tuy vao tung api detail user User Data se khac nhau
    const [dataUser] = useState({
        _id: staticValue.ID_USER,
        name: `${userInfo?.user?.firstName} ${userInfo?.user?.lastName}`,
    });
    const [image, setImage] = useState<any>({});
    const listStaff = useSelector((state: any) => state?.addStaff);
    const leaveRoom = () => {
        logger('leave room');
        socket.emit(EventSocket.LEAVE_ROOM, { conversationId });
    };
    const getListMessage = async () => {
        setMessages([]);
        const responseMessage = await getAllListMessage(Number(id));
        const messagesNew = responseMessage?.data?.map((item: any) => {
            return formatMessage(item);
        });
        setMessages((previousMessages: any) => {
            return GiftedChat.append(messagesNew, previousMessages);
        });
    };

    const getListOfferPending = async () => {
        try {
            const result = await getListOffer(transactionId);
            if (result?.data.length > 0) {
                const pending = result.data.find((item: any) => item.status === OFFER_STATUS.PENDING);
                pending && setOfferPending(pending);
            }
        } catch (error) {
            logger(error);
        }
    };
    // neu id sau khac id truoc thì rời room
    if (id !== conversationId) {
        leaveRoom();
        setMessages([]);
        setConversationId(id);
    }
    useEffect(() => {
        setTimeout(() => {
            joinRoom();
        }, 100);
    }, [conversationId]);
    useEffect(() => {
        if (image?.URL) {
            onSend(
                [
                    {
                        createdAt: new Date().getTime(),
                        _id: Math.random().toString(),
                    },
                ],
                staticValue.TYPE_MESSAGE_IMAGE,
            );
            setImage({});
        }
    }, [image, conversationId]);
    const formatMessage = (item: any) => {
        return {
            _id: item?.createdAt || item?._id,
            text: item?.messageType === staticValue.TYPE_MESSAGE_TEXT && item?.body,
            createdAt: item?.createdAt,
            user: {
                _id: item?.memberType === staticValue.ADMIN_TYPE ? Math.random().toString() : staticValue.ID_USER,
                name:
                    listStaff?.find(
                        (staff: any) => Number(`2${staff?.staffId}`) === Number(`${item?.memberType}${item?.memberId}`),
                    )?.nickname || dataUser?.name,
            },
            image: item?.messageType === staticValue.TYPE_MESSAGE_IMAGE && item?.image,
            image50x50: item?.messageType === staticValue.TYPE_MESSAGE_IMAGE && item?.image50x50,
            image400x400: item?.messageType === staticValue.TYPE_MESSAGE_IMAGE && item?.image400x400,
            messageType: item?.messageType,
        };
    };
    const onSend = async (mess: any = [], messageType = staticValue.TYPE_MESSAGE_TEXT) => {
        const newMess = {
            ...mess[0],
            user: dataUser,
            image: image?.URL,
            image50x50: image?.URL50x50,
            image400x400: image?.URL400x400,
            messageType,
        };
        const dataChat = {
            conversationId: Number(conversationId),
            body: messageType === staticValue.TYPE_MESSAGE_TEXT ? mess[0]?.text : '',
            image: messageType === staticValue.TYPE_MESSAGE_TEXT ? '' : image.URL,
            messageType,
            metadata: null,
        };
        // if (messageType === staticValue.TYPE_MESSAGE_OFFER) {
        //     setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMess));
        // } else {
        try {
            const result = await sendMessage(dataChat);
            if (result) {
                setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMess));
                // getListMessage();
                // setIsChat(true);
            }
        } catch (err) {
            logger(err);
        }
        // }
    };
    const emitJoinRoom = async () => {
        logger('focus screen', undefined, focusScreen);
        if (
            focusScreen === ASSESSMENT_ROUTE.CONVERSATION ||
            focusScreen === ASSESSMENT_ROUTE.VIDEO_CALL_VIEW ||
            focusScreen === ASSESSMENT_ROUTE.PREPARE_TIME
        ) {
            try {
                const transactionAppraising = await getStatusTransaction();
                const detailTransaction = await getTransactionById(transactionId);
                if (transactionAppraising.data) {
                    getListMessage();
                    getListOfferPending();
                } else {
                    setDataClose(detailTransaction);
                }
            } catch (error) {
                logger(error);
            } finally {
                // setLoading(false);
            }
        }
        socket.emit(EventSocket.JOIN_ROOM, {
            conversationId,
            lastTime: new Date().getTime(),
        });
    };
    const joinRoom = () => {
        emitJoinRoom();
        socket.off(EventSocket.MESSAGES);
        socket.on(EventSocket.MESSAGES, (data: any) => {
            if (data.memberType === staticValue.ADMIN_TYPE) {
                setMessages((previousMessages: any) => {
                    return GiftedChat.append(previousMessages, [formatMessage(data)]);
                });
            }
        });
        socket.off(EventSocket.TYPING);
        socket.on(EventSocket.TYPING, (dataStartTyping: any) => {
            if (dataStartTyping[0].memberType === staticValue.ADMIN_TYPE) {
                setIsAdminTyping(true);
            }
        });
        socket.off(EventSocket.OFF_TYPING);
        socket.on(EventSocket.OFF_TYPING, (dataEndTyping: any) => {
            if (dataEndTyping[0].memberType === staticValue.ADMIN_TYPE) {
                setIsAdminTyping(false);
            }
        });
        socket.off('reconnect');
        socket.on('reconnect', () => {
            setIsAdminTyping(false);
            logger('reconnect socket');
            leaveRoom();
            setTimeout(() => {
                emitJoinRoom();
            }, 100);
        });
    };

    const startTyping = () => {
        socket.emit(EventSocket.START_TYPING, { conversationId });
    };
    const endTyping = () => {
        socket.emit(EventSocket.END_TYPING, { conversationId });
    };

    return {
        leaveRoom,
        messages,
        onSend,
        setImage,
        dataUser,
        setMessages,
        loading,
        offerPending,
        dataClose,
        dataRefuse,
        setDataClose,
        setDataRefuse,
        setOfferPending,
        startTyping,
        endTyping,
        isAdminTyping,
        // isChat,
        // setIsChat,
    };
};
