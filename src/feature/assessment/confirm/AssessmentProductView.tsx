/* eslint-disable react/no-children-prop */
import { useNavigation } from '@react-navigation/native';
import { updateImage } from 'app-redux/product/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { DATA_CONFIRM, TYPE_CATEGORY } from 'feature/staticData';
import useTakePhoto from 'hooks/useTakePhoto';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import ContainerCamera from '../components/ContainerCamera';

const AssessmentProductView = (data: any) => {
    const { route } = data;
    const { params } = route;
    const dispatch = useDispatch();
    const [listExample, setListExample] = useState<any>([]);
    const [textExample, setTextExample] = useState('');
    const [isCanCheck, setIsCanCheck] = useState(false);
    const navigation = useNavigation();
    const { showModalPhoto, imageProduct } = useTakePhoto();
    useEffect(() => {
        for (let i = 0; i < TYPE_CATEGORY?.length; i += 1) {
            if (TYPE_CATEGORY[i].type === params?.type) {
                setListExample(TYPE_CATEGORY[i].image);
                setTextExample(TYPE_CATEGORY[i].title);
            }
        }
    }, []);
    useEffect(() => {
        setIsCanCheck(imageProduct?.whole?.URL && imageProduct?.logo?.URL);
        const imageData = [imageProduct?.whole, imageProduct?.logo];
        dispatch(updateImage(imageData));
    }, [imageProduct]);
    return (
        <View style={styles.container}>
            <StyledHeader title={'assessment.shootingProduct'} />
            <StyledText i18nText={'assessment.textTakePicture'} customStyle={styles.takePicture} />
            <View style={styles.viewTakePhoto}>
                {DATA_CONFIRM.map((item, index) => (
                    <ContainerCamera
                        customStyle={styles.itemPhoto}
                        key={index}
                        image={!index ? imageProduct?.whole : imageProduct?.logo}
                        onPress={() => showModalPhoto(index)}
                        index={item.id}
                        title={item.title}
                        viewNull
                        disabled={false}
                    />
                ))}
            </View>
            {params?.type < 4 ? <StyledText i18nText={'assessment.example'} customStyle={styles.example} /> : null}
            <View style={styles.viewImageExample}>
                {listExample?.map((item: any, index: number) => (
                    <StyledImage key={index} source={listExample[index]} customStyle={styles.imgPhoto} />
                ))}
            </View>
            {textExample ? <StyledText i18nText={textExample} customStyle={styles.logoInside} /> : null}
            <StyledButton
                title={'assessment.check'}
                onPress={() => navigation.navigate(ASSESSMENT_ROUTE.CONFIRM_CONTENT)}
                customStyle={styles.buttonCheck}
                disabled={!isCanCheck}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    takePicture: {
        textAlign: 'center',
        fontSize: 15,
        color: Themes.COLORS.assessment.takePicture,
        marginTop: 36,
    },
    index: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Themes.COLORS.bottomTab.camera,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIndex: {
        fontSize: 12,
        color: Themes.COLORS.white,
    },
    viewTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    titlePicture: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
        marginLeft: 4,
    },
    buttonPicture: {
        width: '157@s',
        height: '157@vs',
        backgroundColor: Themes.COLORS.assessment.buttonPicture,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgProduct: {
        width: '157@s',
        height: '157@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    take: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.take,
        marginTop: 7,
    },
    viewTakePhoto: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    itemPhoto: {
        marginLeft: 10,
        marginTop: 40,
    },
    example: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
        marginLeft: 20,
        marginTop: 20,
    },
    viewImageExample: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 8,
    },
    logoInside: {
        fontSize: 12,
        color: Themes.COLORS.assessment.logoInside,
        marginLeft: 20,
        marginTop: 11,
    },
    imgPhoto: {
        width: 96,
        height: 72,
        marginRight: 10,
    },
    buttonCheck: {
        marginTop: 40,
    },
});
export default AssessmentProductView;
