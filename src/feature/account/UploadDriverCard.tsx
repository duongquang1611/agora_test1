import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import useTakePhotoCard from 'hooks/useTakePhotoCard';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { push } from 'navigation/NavigationService';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemNoteCard from './components/ItemNoteCard';
import UpdateCameraView from './personInfo/UpdateCameraView';

const UploadDriverCard = ({ route }: any) => {
    const { TWO_FACE_IMAGE, ENUM_MEMBER_ID_TYPE } = staticValue;
    const { navigateFrom = '' } = route?.params || {};
    const { showModalCard, frontImage, backImage, disable } = useTakePhotoCard(
        ENUM_MEMBER_ID_TYPE.DRIVING_LICENSE,
        TWO_FACE_IMAGE,
    );
    const handleUpdateButton = () => {
        push(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.CONFIRM_CARD, {
            doubleImage: true,
            image: { frontImage, backImage },
            IDType: ENUM_MEMBER_ID_TYPE.DRIVING_LICENSE,
            numOfImages: TWO_FACE_IMAGE,
            navigateFrom,
        });
    };
    return (
        <View style={styles.flex1}>
            <StyledHeader title="verifyIdentity.titleDriver" />
            <ScrollView style={styles.content}>
                <StyledText i18nText="verifyIdentity.driverCardSubTitle" customStyle={styles.subTitle} />
                <StyledTouchable customStyle={styles.imageContainer} onPress={showModalCard}>
                    {frontImage?.URL ? (
                        <View style={styles.fullViewImage}>
                            <UpdateCameraView onPress={showModalCard} />
                            <ProgressiveImage {...frontImage} style={styles.image} />
                        </View>
                    ) : (
                        <View style={styles.image}>
                            <StyledIcon source={Images.icons.assessment.iconPhoto} size={50} />
                            <StyledText
                                i18nText={'verifyIdentity.takePhotoPlaceholder'}
                                customStyle={styles.imageText}
                            />
                        </View>
                    )}
                </StyledTouchable>
                <StyledTouchable customStyle={styles.imageContainer} onPress={() => showModalCard(false)}>
                    {backImage?.URL ? (
                        <View style={styles.fullViewImage}>
                            <UpdateCameraView onPress={() => showModalCard(false)} />
                            <ProgressiveImage {...backImage} style={styles.image} />
                        </View>
                    ) : (
                        <View style={styles.image}>
                            <StyledIcon source={Images.icons.assessment.iconPhoto} size={50} />
                            <StyledText
                                i18nText={'verifyIdentity.takePhotoPlaceholder'}
                                customStyle={styles.imageText}
                            />
                        </View>
                    )}
                </StyledTouchable>
                <View style={styles.noteContainer}>
                    <StyledText i18nText="verifyIdentity.noteTitle" customStyle={styles.noteTitle} />
                    <ItemNoteCard text="verifyIdentity.driver.note1" />
                    <ItemNoteCard text="verifyIdentity.driver.note2" />
                </View>
                <StyledButton
                    disabled={disable}
                    onPress={handleUpdateButton}
                    title="verifyIdentity.driver.buttonConfirm"
                    customStyle={styles.updateButton}
                />
            </ScrollView>
        </View>
    );
};
const styles = ScaledSheet.create({
    noteContainer: {
        paddingHorizontal: '20@s',
    },
    noteItem: {
        fontSize: 14,
        lineHeight: 20,
        paddingBottom: 10,
    },
    noteTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 24,
        paddingBottom: 20,
        paddingTop: 30,
    },
    imageText: {
        color: Themes.COLORS.placeHolderGray,
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10,
    },
    updateButton: {
        marginTop: '20@vs',
        width: Metrics.screenWidth - 70,
        marginHorizontal: '35@s',
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    imageContainer: {
        height: '257@vs',
        width: '100%',
        backgroundColor: Themes.COLORS.backgroundPrimary,
        marginVertical: '5@vs',
        padding: '20@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '15@vs',
        marginBottom: '40@vs',
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
export default UploadDriverCard;
