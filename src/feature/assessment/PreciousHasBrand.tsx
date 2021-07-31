import { useNavigation } from '@react-navigation/native';
import { updateImage } from 'app-redux/product/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import useTakePhoto from 'hooks/useTakePhoto';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import ItemImageView from './components/ItemImageView';

const PreciousHasBrand = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { showModalPhoto, imageProduct } = useTakePhoto();
    useEffect(() => {
        const imageData = [imageProduct?.whole, imageProduct?.logo];
        dispatch(updateImage(imageData));
    }, [imageProduct]);
    return (
        <>
            <StyledHeader title={'assessment.confirm.titleEditCertificate'} />
            <View style={styles.container}>
                <StyledText i18nText={'assessment.textTakePicture'} customStyle={styles.takePicture} />
                <ItemImageView
                    image={imageProduct?.whole}
                    width={294}
                    height={180}
                    customStyle={styles.image}
                    isSquare={false}
                    disabled={false}
                    viewNull
                    onPress={() => showModalPhoto(0)}
                />
                <StyledButton
                    title={'assessment.checkHasBrand'}
                    onPress={() =>
                        navigation.navigate(ASSESSMENT_ROUTE.CONFIRM_CONTENT, { type: staticValue.HAS_BRAND })
                    }
                    customStyle={styles.buttonCheck}
                    disabled={!imageProduct?.whole?.URL}
                />
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    takePicture: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: '36@vs',
        color: Themes.COLORS.assessment.takePicture,
    },
    image: {
        alignSelf: 'center',
        marginTop: '36@vs',
    },
    buttonCheck: {
        marginTop: '36@vs',
    },
});

export default PreciousHasBrand;
