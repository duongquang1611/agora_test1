import { useNavigation } from '@react-navigation/native';
import { updateImage } from 'app-redux/product/actions';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import useTakePhoto from 'hooks/useTakePhoto';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import ItemImageView from '../components/ItemImageView';

const TakeCertificateView = () => {
    const navigation = useNavigation();
    const { showModalCertificate, imageProduct } = useTakePhoto();
    const dispatch = useDispatch();
    const [isPreview, setIsPreview] = useState(true);
    useEffect(() => {
        const imageData = [imageProduct?.whole, imageProduct?.logo];
        dispatch(updateImage(imageData));
    }, [imageProduct]);
    // useEffect(() => {
    //     (async () => {
    //         const countJoinCertificate = await countJoinFunction(staticValue.KEY_SHOW_PREVIEW_CERTIFICATE);
    //         if (Number(countJoinCertificate) <= staticValue.DEFAULT_VALUE) {
    //             setIsPreview(true);
    //         }
    //     })();
    // }, []);
    return (
        <View style={styles.container}>
            <StyledHeader title={'assessment.confirm.titleCertificateNew'} />
            <StyledText i18nText={'assessment.confirm.takeCertificate'} customStyle={styles.takeCertificate} />
            <View style={styles.viewCertification}>
                <ItemImageView
                    image={imageProduct?.whole}
                    width={294}
                    height={180}
                    customStyle={styles.buttonCertificate}
                    onPress={() => showModalCertificate(0)}
                    isSquare={false}
                    disabled={false}
                    viewNull
                />
                {isPreview && (
                    <ImageBackground source={Images.photo.assessment.imgPreview_empty} style={styles.imgPreview}>
                        <StyledText i18nText={'assessment.confirm.preview'} customStyle={styles.textPreview} />
                        <StyledTouchable onPress={() => setIsPreview(false)} customStyle={styles.buttonClosePreview}>
                            <StyledIcon source={Images.icons.close} size={8} customStyle={styles.iconClosePreview} />
                        </StyledTouchable>
                    </ImageBackground>
                )}
                <StyledButton
                    title={'assessment.confirm.checkCertificate'}
                    onPress={() =>
                        navigation.navigate(ASSESSMENT_ROUTE.CONFIRM_CONTENT, { type: staticValue.NO_BRAND })
                    }
                    customStyle={styles.buttonCheck}
                    disabled={!imageProduct?.whole?.URL}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    takeCertificate: {
        fontSize: 15,
        marginVertical: '36@vs',
        textAlign: 'center',
        color: Themes.COLORS.assessment.confirm.take,
    },
    take: {
        color: Themes.COLORS.assessment.confirm.take,
        fontSize: 12,
        marginTop: 3,
    },
    buttonCertificate: {
        backgroundColor: Themes.COLORS.assessment.buttonPicture,
        alignSelf: 'center',
        borderRadius: 3,
    },
    imageCertificate: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '294@s',
        height: '180@vs',
    },
    imgPreview: {
        width: '287@s',
        height: '103@s',
        marginLeft: 20,
        position: 'absolute',
        bottom: '-103@s',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconClosePreview: {
        margin: 5,
    },
    buttonClosePreview: {
        // alignSelf: 'flex-end',
        // justifyContent: 'center',
        // alignItems: 'center',
        right: 10,
        top: 15,
        position: 'absolute',
        zIndex: 10,
    },
    buttonCheck: {
        position: 'absolute',
        bottom: '-95@vs',
    },
    viewCertification: {},
    textPreview: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        lineHeight: '21@ms',
    },
});

export default TakeCertificateView;
