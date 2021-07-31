import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledButton, StyledIcon, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const ChangeIDScreen = ({ route }: any) => {
    const { navigateFrom = '' } = route?.params || {};
    const { user } = useSelector((state: any) => state.userInfo);
    const handleUpdateButton = () => navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.CHANGE_ID_MENU, { navigateFrom });
    const renderDefaultImage = () => (
        // <StyledFastImage source={Images.photo.assessment.imgProductDefault} customStyle={styles.image} />
        <View style={styles.image}>
            <StyledIcon source={Images.icons.assessment.iconPhoto} size={50} />
            <StyledText i18nText={'verifyIdentity.takePhotoPlaceholder'} customStyle={styles.imageText} />
        </View>
    );
    return (
        <View style={styles.flex1}>
            <StyledHeader title="personInfo.changeId" />
            <ScrollView style={styles.content}>
                <StyledText i18nText="verifyIdentity.currentIdSubTitle" customStyle={styles.subTitle} />
                <View style={[styles.imageContainer, styles.padding20]}>
                    {user?.IDCards[0]?.memberImages?.[0]?.URL ? (
                        <View style={styles.fullViewImage}>
                            <ProgressiveImage {...user?.IDCards[0]?.memberImages?.[0]} style={styles.image} />
                        </View>
                    ) : (
                        renderDefaultImage()
                    )}
                </View>
                {user?.IDCards[0]?.memberImages?.length > 1 && (
                    <View style={[styles.imageContainer, styles.padding20]}>
                        {user?.IDCards[0]?.memberImages?.[1]?.URL ? (
                            <View style={styles.fullViewImage}>
                                <ProgressiveImage {...user?.IDCards[0]?.memberImages?.[1]} style={styles.image} />
                            </View>
                        ) : (
                            renderDefaultImage()
                        )}
                    </View>
                )}
                <StyledButton
                    onPress={handleUpdateButton}
                    title={'verifyIdentity.newUploadButton'}
                    customStyle={styles.updateButton}
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
        marginTop: '40@vs',
        marginBottom: '10@vs',
    },
    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    imageContainer: {
        height: '257@vs',
        width: '100%',
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
    imageText: {
        color: Themes.COLORS.placeHolderGray,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10,
    },
});
export default ChangeIDScreen;
