/* eslint-disable import/no-unresolved */
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText, StyledTouchable } from 'components/base';
import StyledHeaderCamera from 'components/common/StyledHeaderCamera';
import { staticValue } from 'feature/staticData';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ScaledSheet } from 'react-native-size-matters';
import { checkBlockCamera } from 'utilities/permissions';
import ImageUploaded from 'utilities/upload/ImageUploader';

const ModalCameraView = ({ getUrl, idImage, customOnClose, modalize }: any) => {
    const cameraRef = useRef<any>();
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
                title={'assessment.take'}
                iconLeft={Images.icons.close}
                iconRight={Images.icons.assessment.iconFlash}
                onClose={() => {
                    modalize.dismiss(1);
                    customOnClose?.();
                }}
                isFlash={isFlash}
                onFlash={() => setIsFlash(!isFlash)}
            />
            <View style={styles.container}>
                {url ? (
                    <View style={styles.container}>
                        <ImageBackground source={{ uri: url }} style={styles.viewCamera}>
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
                                    customOnClose?.();
                                    getUrl(imageLink, idImage);
                                }}
                            >
                                <StyledText i18nText={'assessment.done'} customStyle={styles.textConfirm} />
                            </StyledTouchable>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.wrapperCamera}>
                            <RNCamera
                                ref={cameraRef}
                                style={styles.viewCamera}
                                type={RNCamera.Constants.Type.back}
                                useNativeZoom={true}
                                maxZoom={staticValue.ZOOM_CAM.MAX_ZOOM}
                                flashMode={isFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                            />
                        </View>
                        <StyledText i18nText={'assessment.note'} customStyle={styles.textNote} />
                        <StyledTouchable onPress={() => takePhoto()} customStyle={styles.buttonCamera}>
                            <StyledImage
                                source={Images.icons.assessment.iconTake}
                                customStyle={styles.iconTake}
                                resizeMode={'contain'}
                            />
                        </StyledTouchable>
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
        width: '100%',
        height: '379@vs',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNote: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 80,
        color: Themes.COLORS.white,
    },
    iconTake: {
        width: 69,
        height: 69,
        overflow: 'hidden',
    },
    buttonCamera: {
        width: 69,
        height: 69,
        marginTop: '48@vs',
        alignSelf: 'center',
    },
    viewConfirm: {
        flexDirection: 'row',
        marginTop: '218@vs',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'flex-end',
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
        fontWeight: 'bold',
        fontSize: 17,
        paddingVertical: 12,
        paddingHorizontal: 35,
    },
    wrapperCamera: {
        width: '100%',
        height: '379@vs',
        alignItems: 'center',
        justifyContent: 'center',
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

export default ModalCameraView;
