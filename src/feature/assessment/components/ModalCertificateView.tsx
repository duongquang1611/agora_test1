/* eslint-disable import/no-unresolved */
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText, StyledTouchable } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledHeaderCamera from 'components/common/StyledHeaderCamera';
import { staticValue } from 'feature/staticData';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ScaledSheet } from 'react-native-size-matters';
import { checkBlockCamera } from 'utilities/permissions';
import ImageUploaded from 'utilities/upload/ImageUploader';

const ModalCertificateView = ({ getUrl, idImage }: any) => {
    const cameraRef = useRef<any>();
    const modalize = ModalizeManager();
    const [isFlash, setIsFlash] = useState(false);
    const [url, setUrl] = useState('');
    const [imageLink, setImageLink] = useState<any>({});
    useEffect(() => {
        checkBlockCamera();
    }, []);
    const takePhoto = async () => {
        const options = { quality: 0.5, base64: false };
        const data = await cameraRef.current.takePictureAsync(options);
        setUrl(data?.uri);
        const link: any = await ImageUploaded.uploader(data?.uri);
        if (link?.URL) {
            setImageLink(link);
        }
    };
    return (
        <>
            <StyledHeaderCamera
                title={'assessment.confirm.taking'}
                iconLeft={Images.icons.close}
                iconRight={Images.icons.assessment.iconFlash}
                onClose={() => modalize.dismiss(1)}
                onFlash={() => setIsFlash(!isFlash)}
                isFlash={isFlash}
            />
            <View style={styles.container}>
                {url ? (
                    <View style={styles.container}>
                        <ImageBackground source={{ uri: url }} style={styles.viewAfterTake}>
                            {!imageLink?.URL && (
                                <View style={styles.viewLoading}>
                                    <View style={styles.circle}>
                                        <ActivityIndicator
                                            style={styles.loading}
                                            color={Themes.COLORS.black}
                                            size={staticValue.SIZE_LOADING}
                                        />
                                    </View>
                                </View>
                            )}
                        </ImageBackground>
                        <View style={styles.viewConfirm}>
                            <StyledTouchable onPress={() => setUrl('')}>
                                <StyledText i18nText={'assessment.reTake'} customStyle={styles.textReTake} />
                            </StyledTouchable>
                            <StyledTouchable
                                customStyle={[
                                    styles.buttonConfirm,
                                    {
                                        backgroundColor: imageLink?.URL
                                            ? Themes.COLORS.assessment.buttonConfirm
                                            : Themes.COLORS.westar,
                                    },
                                ]}
                                disabled={!imageLink?.URL}
                                onPress={() => {
                                    modalize.dismiss(1);
                                    getUrl(imageLink, idImage);
                                }}
                            >
                                <StyledText i18nText={'assessment.done'} customStyle={styles.textConfirm} />
                            </StyledTouchable>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.viewTaking}>
                            <RNCamera
                                ref={cameraRef}
                                style={styles.viewCamera}
                                type={RNCamera.Constants.Type.back}
                                useNativeZoom={true}
                                maxZoom={staticValue.ZOOM_CAM.MAX_ZOOM}
                                flashMode={isFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                            />
                            <StyledText i18nText={'assessment.confirm.noteCertificate'} customStyle={styles.textNote} />
                        </View>
                        <View style={styles.viewButtonTake}>
                            <StyledTouchable onPress={() => takePhoto()} customStyle={styles.buttonCamera}>
                                <StyledImage
                                    source={Images.icons.assessment.iconTake}
                                    customStyle={styles.iconTake}
                                    resizeMode={'contain'}
                                />
                            </StyledTouchable>
                        </View>
                    </View>
                )}
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.assessment.backgroundModal,
        height: Metrics.screenHeight - 50,
    },
    viewCamera: {
        width: Metrics.screenWidth - 30,
        height: '544@vs',
        overflow: 'hidden',
        alignSelf: 'center',
        borderRadius: 28,
        marginTop: 10,
    },
    viewAfterTake: {
        width: Metrics.screenWidth,
        height: '595@vs',
        overflow: 'hidden',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textNote: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Themes.COLORS.white,
        marginTop: 10,
    },
    iconTake: {
        width: '69@vs',
        height: '69@vs',
    },
    buttonCamera: {
        width: '69@vs',
        height: '69@vs',
        alignSelf: 'center',
        marginTop: '10@vs',
    },
    viewConfirm: {
        flexDirection: 'row',
        marginTop: '11@vs',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'flex-end',
        backgroundColor: Themes.COLORS.assessment.backgroundModal,
    },
    textReTake: {
        fontSize: 15,
        color: Themes.COLORS.bottomTab.camera,
        fontWeight: 'bold',
        marginLeft: 36,
    },
    buttonConfirm: {
        borderRadius: 5,
        marginRight: 32,
    },
    textConfirm: {
        color: Themes.COLORS.white,
        fontWeight: '700',
        fontSize: 17,
        paddingVertical: 12,
        paddingHorizontal: 35,
    },
    viewTaking: {
        height: '595@vs',
        backgroundColor: Themes.COLORS.assessment.confirm.colorTaking,
    },
    viewButtonTake: {
        backgroundColor: Themes.COLORS.assessment.backgroundModal,
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Themes.COLORS.white,
    },
    viewLoading: {
        position: 'absolute',
        zIndex: 10,
    },
    loading: {
        flex: 1,
    },
});

export default ModalCertificateView;
