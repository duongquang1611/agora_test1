import { useNavigation } from '@react-navigation/native';
import { addProduct } from 'api/assessment';
import { deleteProduct } from 'app-redux/product/actions';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import ShowAlertMessage from 'components/common/ShowAlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { DATA_CONFIRM, staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'utilities/logger';
import ContainerCamera from '../components/ContainerCamera';

const ConfirmContentView = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const modal = useModal();
    const { category, brand, arrayImage } = useSelector((state: any) => state.product);
    const handleMethod = async () => {
        try {
            const dataProduct = {
                categoryId: category.categoryId,
                brandId: brand.brandId,
                images: [
                    {
                        URL: arrayImage[0]?.URL || '',
                        type: staticValue.TYPE_IMAGE_WHOLE,
                    },
                    {
                        URL: arrayImage[1]?.URL || '',
                        type: staticValue.TYPE_IMAGE_LOGO,
                    },
                ],
            };
            const result = await addProduct(dataProduct);
            logger(result?.data);
            navigation.navigate(ASSESSMENT_ROUTE.METHOD_ASSESSMENT, { productId: result?.data?.productId });
        } catch (error) {
            AlertMessage(error);
        }
    };
    const deleteAssessment = () => {
        modal.show({
            children: (
                <ShowAlertMessage
                    title={'assessment.confirm.deleteAssessment'}
                    message={''}
                    messageCancel={'common.no'}
                    messageConfirm={'common.yes'}
                    onCancel={cancelDeleteAssessment}
                    onConfirm={confirmDeleteAssessment}
                />
            ),
        });
    };
    const cancelDeleteAssessment = () => {
        modal.dismiss();
    };
    const confirmDeleteAssessment = () => {
        modal.dismiss(undefined, () => {
            dispatch(deleteProduct());
            navigation.navigate(TAB_NAVIGATION_ROOT.ASSESSMENT_ROUTE.ROOT);
        });
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'assessment.confirm.title'} />
            <View style={styles.viewCategory}>
                <StyledText i18nText={'assessment.confirm.category'} customStyle={styles.keyCategory} />
                <StyledText originValue={category.name} customStyle={styles.valueCategory} />
            </View>
            <View style={styles.viewBrand}>
                <StyledText i18nText={'assessment.confirm.brand'} customStyle={styles.keyBrand} />
                <StyledText originValue={brand.name} customStyle={styles.valueBrand} />
            </View>
            <StyledText i18nText={'assessment.confirm.image'} customStyle={styles.textImage} />
            {category.categoryId !== staticValue.TYPE_BRAND_NOT_EXIST ? (
                <View style={styles.viewImage}>
                    {arrayImage?.map((item: any, index: number) => (
                        // <ItemImageView key={index} image={item} viewNull />
                        <ContainerCamera
                            key={index}
                            image={item}
                            index={DATA_CONFIRM[index].id}
                            title={DATA_CONFIRM[index].title}
                            viewNull
                            disabled
                        />
                    ))}
                </View>
            ) : (
                <StyledImage source={{ uri: arrayImage[0]?.URL }} customStyle={styles.imageCertificate} />
            )}
            <StyledButton
                title={
                    category.categoryId !== staticValue.TYPE_BRAND_NOT_EXIST
                        ? 'common.confirmAction'
                        : 'common.confirmActionPrecious'
                }
                onPress={() => handleMethod()}
                customStyle={styles.buttonConfirm}
            />
            <StyledButton
                title={'assessment.confirm.edit'}
                onPress={() => navigation.navigate(ASSESSMENT_ROUTE.EDIT_CONTENT)}
                customStyle={styles.buttonEdit}
                colorText={Themes.COLORS.assessment.confirm.camera}
            />
            <StyledTouchable customStyle={styles.viewDelete} onPress={() => deleteAssessment()}>
                <StyledIcon source={Images.icons.close} size={13} customStyle={styles.iconClose} />
                <StyledText i18nText={'assessment.confirm.cancel'} customStyle={styles.textCancel} />
            </StyledTouchable>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    keyCategory: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
    },
    valueCategory: {
        fontSize: 15,
        marginTop: '10@vs',
        color: Themes.COLORS.assessment.titlePicture,
    },
    keyBrand: {
        color: Themes.COLORS.assessment.titlePicture,
    },
    valueBrand: {
        color: Themes.COLORS.assessment.titlePicture,
        fontSize: 15,
        marginTop: '10@vs',
    },
    viewCategory: {
        borderBottomColor: Themes.COLORS.assessment.confirm.line,
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginHorizontal: 40,
        marginTop: '36@vs',
    },
    viewBrand: {
        borderBottomColor: Themes.COLORS.assessment.confirm.line,
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginTop: '20@vs',
        marginHorizontal: 40,
    },
    textImage: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
        marginLeft: 40,
        marginTop: 40,
    },
    viewImage: {
        flexDirection: 'row',
        marginLeft: 36,
        marginTop: 10,
    },
    buttonEdit: {
        marginTop: 15,
        backgroundColor: Themes.COLORS.white,
    },
    buttonConfirm: {
        marginTop: '36@vs',
    },
    viewDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: '35@s',
        marginTop: '16@vs',
    },
    textCancel: {
        fontSize: 15,
        color: Themes.COLORS.assessment.confirm.camera,
        paddingLeft: 8,
    },
    iconClose: {
        tintColor: Themes.COLORS.assessment.confirm.camera,
    },
    imageCertificate: {
        width: '294@s',
        height: '180@vs',
        backgroundColor: Themes.COLORS.assessment.titlePicture,
        marginTop: 8,
        alignSelf: 'center',
    },
});

export default ConfirmContentView;
