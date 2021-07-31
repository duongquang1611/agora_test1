import { closeTransaction } from 'api/assessment';
import { getStatusTransaction } from 'api/home';
import { getTotalNotification } from 'api/modules/api-app/notification';
import { updateCommon } from 'app-redux/common/actions';
import { updateNotification } from 'app-redux/notification/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledFastImage from 'components/base/StyledFastImage';
import ShowAlertMessage from 'components/common/ShowAlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from 'utilities/convert';
import { countJoinFunction, isIos, logger } from 'utilities/helper';
import { useOnesignal } from 'utilities/notification';
import { DATA_URL, staticValue } from '../staticData';
import CategoryView from './CategoryView';
import ModalNotificationView from './components/ModalNotificationView';

const HomeView = () => {
    const modal = useModal();
    const { configs, subCategories } = useSelector((state: any) => state.resource);
    const dispatch = useDispatch();
    const webTutorial = getConfig(staticValue.CONFIG_KEY.WEB_TUTORIAL)?.value;

    useOnesignal();
    useEffect(() => {
        (async () => {
            const countJoinHome = await countJoinFunction(staticValue.KEY_SHOW_NOTIFICATION);
            if (Number(countJoinHome) <= staticValue.DEFAULT_VALUE) {
                modal.show({
                    children: <ModalNotificationView onPress={showConfirmNotification} />,
                });
            }
            try {
                const notification = await getTotalNotification();
                if (notification) {
                    dispatch(
                        updateNotification({
                            totalNotification: notification?.data?.totalAllNotifiedUnread,
                            allNotification: notification?.data?.totalCommonNotifiedUnread,
                            personalNotification: notification?.data?.totalPersonNotifiedUnread,
                        }),
                    );
                }
                const dataTransaction = await getStatusTransaction();
                if (dataTransaction?.data) {
                    await closeTransaction(dataTransaction.data.id);
                }
            } catch (err) {
                logger(err);
                AlertMessage(err);
            }
        })();
    }, []);
    const showConfirmNotification = () => {
        modal.dismiss();
        dispatch(updateCommon({ isShowNotification: true }));
        if (!isIos) {
            modal.show({
                children: (
                    <ShowAlertMessage
                        title={'homeView.titleNotification'}
                        message={'homeView.messageNotification'}
                        messageCancel={'common.no'}
                        messageConfirm={'common.yes'}
                        onConfirm={confirmNotification}
                        oneOption
                    />
                ),
            });
        }
    };
    const confirmNotification = () => {
        modal.dismiss();
    };
    return (
        <View style={styles.container}>
            {/* <StyledText i18nText={'homeView.title'} customStyle={styles.title} />
            <ScrollableTabView
                tabBarActiveTextColor={Themes.COLORS.homeView.underLine}
                tabBarInactiveTextColor={Themes.COLORS.homeView.inActiveText}
                tabBarUnderlineStyle={styles.underLine}
                tabBarTextStyle={styles.textTab}
                style={styles.tabCategory}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {categories?.map((item: any, index: number) => (
                    <CategoryView key={index} tabLabel={item?.name} product={item} />
                ))}
            </ScrollableTabView> */}
            <StyledHeader title={'homeView.title'} hasBack={false} />
            <ScrollView>
                <StyledFastImage source={{ uri: configs?.[0]?.value }} customStyle={styles.banner}>
                    <StyledText i18nText={'homeView.detail'} customStyle={styles.detail} />
                    <StyledButton
                        title={'homeView.startAssessment'}
                        onPress={() => navigate(TAB_NAVIGATION_ROOT.ASSESSMENT_ROUTE.ROOT)}
                        customStyle={styles.buttonStartAssessment}
                    />
                </StyledFastImage>
                <StyledTouchable
                    customStyle={styles.buttonHelp}
                    onPress={() => {
                        navigate(WEBVIEW_ROUTE.WEBVIEW, {
                            url: webTutorial || DATA_URL.manual,
                        });
                    }}
                >
                    <StyledText i18nText={'homeView.help'} customStyle={styles.textHelp} />
                </StyledTouchable>
                <StyledText i18nText={'homeView.category'} customStyle={styles.category} />
                <CategoryView product={subCategories} />
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Themes.COLORS.homeView.title,
        marginTop: 72,
        marginLeft: 29,
    },
    underLine: {
        backgroundColor: Themes.COLORS.homeView.underLine,
        height: 2,
    },
    textTab: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 17,
    },
    tabCategory: {},
    banner: {
        width: '100%',
        height: '429@vs',
    },
    detail: {
        fontSize: '24@s',
        lineHeight: '36@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        left: '24@s',
        position: 'absolute',
        top: '56@vs',
    },
    buttonStartAssessment: {
        position: 'absolute',
        width: '327@s',
        height: '50@s',
        bottom: '40@s',
    },
    buttonHelp: {
        borderRadius: 1,
        borderWidth: 1,
        borderColor: Themes.COLORS.bottomTab.camera,
        justifyContent: 'center',
        width: '327@s',
        marginTop: '36@s',
        alignSelf: 'center',
        alignItems: 'center',
        height: '66@s',
    },
    textHelp: {
        fontSize: '15@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.bottomTab.camera,
    },
    category: {
        fontSize: '18@vs',
        color: Themes.COLORS.homeView.title,
        fontWeight: 'bold',
        marginTop: '65@vs',
        marginLeft: '24@s',
    },
});

export default HomeView;
