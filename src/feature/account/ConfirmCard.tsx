import { updateIDCard } from 'api/account';
import { getProfile } from 'api/modules/api-app/authenticate';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { NAVIGATE_TYPE, staticValue } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import { ASSESSMENT_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmCard = ({ route }: any) => {
    const { doubleImage, image, IDType, numOfImages, navigateFrom = '' } = route?.params || {};
    const isFromVideoChat = navigateFrom === NAVIGATE_TYPE.VIDEO_AND_CHAT;
    const isFromSetting = navigateFrom === NAVIGATE_TYPE.SETTING;
    const { userInfo } = useSelector((state: any) => state);
    const { frontImage = {}, backImage = {} } = image;
    useBackHandler(() => !isFromSetting);
    const modal = useModal(isFromSetting);
    const dispatch = useDispatch();
    const dismissModal = () => {
        modal.dismiss();
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.CHANGE_ID);
    };
    const handleUpdateButton = async () => {
        try {
            let imageArr = [];
            if (numOfImages === 1) imageArr = [{ URL: frontImage?.URL, type: staticValue.TYPE_OF_IMAGE.FRONT }];
            else {
                imageArr = [
                    { URL: frontImage?.URL, type: staticValue.TYPE_OF_IMAGE.FRONT },
                    { URL: backImage?.URL, type: staticValue.TYPE_OF_IMAGE.BACK },
                ];
            }
            await updateIDCard({
                memberIDType: IDType,
                images: imageArr,
            });
            const response = await getProfile();
            dispatch(setUserInfo({ ...userInfo, user: response?.data }));
            if (isFromVideoChat) {
                navigate(ASSESSMENT_ROUTE.SELECT_TRANSFER, { navigateFrom });
            } else {
                modal.show({
                    children: <ModalSuccess onPressIcon={dismissModal} title="verifyIdentity.modal.changedId" />,
                    onBackdropPress: dismissModal,
                });
            }
        } catch (error) {
            AlertMessage(error);
        }
    };
    const handleBack = () => {
        goBack();
    };
    return (
        <View style={styles.flex1}>
            <StyledHeader title="personInfo.changeId" hasBack={isFromSetting} />
            <ScrollView style={styles.content}>
                <StyledText i18nText="verifyIdentity.confirmTitle" customStyle={styles.subTitle} />
                <View style={[styles.imageContainer, styles.padding20]}>
                    <View style={styles.fullViewImage}>
                        <ProgressiveImage {...frontImage} style={styles.image} />
                    </View>
                </View>
                {doubleImage && (
                    <View style={[styles.imageContainer, styles.padding20]}>
                        <View style={styles.fullViewImage}>
                            <ProgressiveImage {...backImage} style={styles.image} />
                        </View>
                    </View>
                )}
                <StyledButton
                    onPress={handleUpdateButton}
                    title={isFromVideoChat ? 'common.next' : 'verifyIdentity.confirmButton'}
                    customStyle={styles.updateButton}
                />
                <StyledButton
                    onPress={handleBack}
                    title="verifyIdentity.pickAgainButton"
                    colorText={Themes.COLORS.primary}
                    customStyle={styles.cancel}
                />
            </ScrollView>
        </View>
    );
};
const styles = ScaledSheet.create({
    padding20: {
        padding: 20,
    },
    modalButton: {
        paddingTop: 20,
    },
    modalMessage: {
        paddingVertical: 10,
        lineHeight: 19,
        fontSize: 14,
    },
    modalContainer: {
        backgroundColor: Themes.COLORS.white,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancel: {
        backgroundColor: Themes.COLORS.white,
        marginVertical: 10,
    },
    updateButton: {
        marginTop: '20@vs',
    },
    subTitle: {
        fontWeight: '600',
        fontSize: '15@vs',
        marginVertical: '10@vs',
        width: '100%',
        textAlign: 'center',
        paddingVertical: '20@vs',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        height: '257@vs',
        width: '343@s',
        backgroundColor: Themes.COLORS.backgroundPrimary,
        marginVertical: '5@vs',
    },
    content: {
        backgroundColor: Themes.COLORS.white,
        flex: 1,
        paddingHorizontal: '15@vs',
        paddingBottom: '30@vs',
    },
    item: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        borderColor: Themes.COLORS.backgroundPrimary,
        borderWidth: 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '15@s',
        paddingVertical: '10@vs',
    },
    flex1: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    grayBg: {
        flex: 1,
        backgroundColor: Themes.COLORS.accountView.background,
    },
    itemStyleContainer: {
        height: '45@vs',
    },
    fullViewImage: {
        width: '100%',
        height: '100%',
    },
});
export default ConfirmCard;
