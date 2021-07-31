/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import { addProduct } from 'api/assessment';
import { updateBrand, updateCategory, updateImage } from 'app-redux/product/actions';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import ItemListText from 'components/ItemListText';
import { DATA_CONFIRM, staticValue } from 'feature/staticData';
import useEditContent from 'hooks/useEditContent';
import useTakePhoto from 'hooks/useTakePhoto';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import ContainerCamera from '../components/ContainerCamera';
import ItemImageView from '../components/ItemImageView';

const EditContentView = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { brands } = useSelector((state: any) => state.resource);
    const { category, brand, arrayImage } = useSelector((state: any) => state.product);
    const { showModalPhoto, imageProduct, showModalCertificate, setImageProduct } = useTakePhoto();
    const { showModalEditCategory, dataEditCategory, showModalEditBrand, dataEditBrand } = useEditContent();
    const [isPreview, setIsPreview] = useState(false);
    const [isPreciousNoBrand, setIsPreciousNoBrand] = useState(false);
    const [dataEdit, setDataEdit] = useState<any>({
        category: { name: category?.name, id: category.categoryId },
        brand: { name: brand?.name, id: brand.brandId },
        imageEdit: arrayImage,
    });
    useEffect(() => {
        dataEdit.brand.id === staticValue.ID_NO_BRAND && setIsPreview(true);
    }, []);
    useEffect(() => {
        setIsPreciousNoBrand(dataEdit.brand.id === staticValue.ID_NO_BRAND);
    }, [dataEdit.brand.id]);
    useEffect(() => {
        if (imageProduct.whole?.URL || imageProduct.logo?.URL) {
            const imageData = [
                imageProduct?.whole?.URL ? imageProduct?.whole : dataEdit.imageEdit[0],
                imageProduct?.logo?.URL ? imageProduct?.logo : dataEdit.imageEdit[1],
            ];
            setDataEdit({ ...dataEdit, imageEdit: imageData });
        }
    }, [imageProduct]);
    const disabledButton =
        dataEdit?.category?.id === staticValue.TYPE_BRAND_NOT_EXIST
            ? !!dataEdit.imageEdit[0]
            : !!dataEdit.imageEdit[0] && !!dataEdit.imageEdit[1];
    useEffect(() => {
        if (dataEditCategory) {
            setImageProduct({ whole: '', logo: '' });
            if (
                dataEditCategory.id === staticValue.TYPE_BRAND_NOT_EXIST &&
                dataEdit.category.id <= staticValue.TYPE_BRAND_NOT_EXIST
            ) {
                setIsPreview(true);
                const dataFirst = brands?.filter((obj: any) => obj.id === staticValue.ID_NO_BRAND);
                setDataEdit({
                    brand: { name: dataFirst[0].name, id: dataFirst[0].id },
                    category: { name: dataEditCategory.name, id: dataEditCategory.id },
                    imageEdit: ['', ''],
                });
            } else if (
                dataEditCategory.id <= staticValue.TYPE_BRAND_NOT_EXIST &&
                dataEdit.category.id === staticValue.TYPE_BRAND_NOT_EXIST
            ) {
                const data = brands?.sort((a: any, b: any) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
                setDataEdit({
                    brand: { name: data[0].name, id: data[0].id },
                    category: { name: dataEditCategory.name, id: dataEditCategory.id },
                    imageEdit: ['', ''],
                });
            } else {
                setDataEdit({
                    ...dataEdit,
                    category: { name: dataEditCategory.name, id: dataEditCategory.id },
                    // imageEdit: ['', ''],
                });
            }
        }
    }, [dataEditCategory]);
    useEffect(() => {
        if (dataEditBrand) {
            // setIsPreview(false);
            setIsPreview(dataEditBrand.id === staticValue.ID_NO_BRAND);
            setDataEdit({ ...dataEdit, brand: { name: dataEditBrand.name, id: dataEditBrand.id } });
        }
    }, [dataEditBrand]);
    const handleMethod = async () => {
        try {
            // dispatch(updateCategory({ categoryId: dataEdit?.category.id, name: dataEdit?.category.name }));
            // dispatch(updateBrand({ brandId: dataEdit.brand.id, name: dataEdit.brand.name }));
            // dispatch(updateImage(dataEdit.imageEdit));
            const dataProduct = {
                categoryId: dataEdit?.category.id,
                brandId: dataEdit.brand.id,
                images: [
                    {
                        URL: dataEdit?.imageEdit[0]?.URL || '',
                        type: staticValue.TYPE_IMAGE_WHOLE,
                    },
                    {
                        URL: dataEdit?.imageEdit[1]?.URL || '',
                        type: staticValue.TYPE_IMAGE_LOGO,
                    },
                ],
            };
            const result = await addProduct(dataProduct);
            navigation.navigate(ASSESSMENT_ROUTE.METHOD_ASSESSMENT, { productId: result?.data?.productId });
        } catch (error) {
            AlertMessage(error);
        }
    };
    const editImagePrecious = () => {
        isPreciousNoBrand ? showModalCertificate(0) : showModalPhoto(0);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'assessment.confirm.titleEdit'} />
            <ItemListText
                title={'assessment.confirm.category'}
                value={dataEdit.category.name}
                customStyle={styles.viewItemCategory}
                hasArrow
                widthLine={Metrics.screenWidth - 80}
                onPress={() => showModalEditCategory()}
            />
            <ItemListText
                title={'assessment.confirm.brand'}
                value={dataEdit.brand.name}
                customStyle={styles.viewItemBrand}
                hasArrow
                widthLine={Metrics.screenWidth - 80}
                onPress={() => showModalEditBrand(dataEdit.category.id)}
            />
            <StyledText
                i18nText={isPreciousNoBrand ? 'assessment.confirm.imageCertificate' : 'assessment.confirm.image'}
                customStyle={styles.textImage}
            />
            {dataEdit.category.id !== staticValue.TYPE_BRAND_NOT_EXIST ? (
                <>
                    <View style={styles.viewImage}>
                        {dataEdit?.imageEdit.map((item: any, index: number) => (
                            <ContainerCamera
                                key={index}
                                image={item}
                                index={DATA_CONFIRM[index].id}
                                title={DATA_CONFIRM[index].title}
                                onPress={() => showModalPhoto(index)}
                                viewNull={!item}
                            />
                        ))}
                    </View>
                    <StyledButton
                        title={'common.confirmAction'}
                        onPress={() => handleMethod()}
                        customStyle={styles.buttonConfirm}
                        disabled={!disabledButton}
                    />
                </>
            ) : (
                <View style={styles.viewImage}>
                    <ItemImageView
                        image={dataEdit?.imageEdit[0]}
                        disabled={false}
                        onPress={() => editImagePrecious()}
                        width={295}
                        height={192}
                        viewNull={!dataEdit?.imageEdit[0]}
                    />
                    {isPreview && (
                        <ImageBackground source={Images.photo.assessment.imgPreview_empty} style={styles.imgPreview}>
                            <StyledText i18nText={'assessment.confirm.preview'} customStyle={styles.textPreview} />
                            <StyledTouchable
                                onPress={() => setIsPreview(false)}
                                customStyle={styles.buttonClosePreview}
                            >
                                <StyledIcon
                                    source={Images.icons.close}
                                    size={8}
                                    customStyle={styles.iconClosePreview}
                                />
                            </StyledTouchable>
                        </ImageBackground>
                    )}
                    <StyledButton
                        title={'common.confirmAction'}
                        onPress={() => handleMethod()}
                        customStyle={styles.buttonConfirmNoBrand}
                        disabled={!disabledButton}
                    />
                </View>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    viewItemCategory: {
        paddingLeft: '40@s',
        paddingRight: '43@vs',
        paddingBottom: '21@vs',
        marginTop: '26@vs',
    },
    viewItemBrand: {
        paddingLeft: '40@s',
        paddingRight: '43@vs',
        paddingBottom: '21@vs',
        marginTop: '22@vs',
    },
    textImage: {
        marginTop: '34@vs',
        fontSize: 15,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
        marginLeft: '40@s',
    },
    viewImage: {
        flexDirection: 'row',
        marginLeft: '32@s',
        marginTop: 10,
    },
    buttonConfirm: {
        marginTop: '40@vs',
    },
    buttonConfirmNoBrand: {
        position: 'absolute',
        bottom: '-82@s',
    },
    buttonClosePreview: {
        right: 10,
        top: 15,
        position: 'absolute',
        zIndex: 10,
    },
    iconClosePreview: {
        margin: 5,
    },
    imgPreview: {
        width: '287@s',
        height: '103@s',
        marginLeft: 20,
        position: 'absolute',
        bottom: '-103@s',
        left: '-40@vs',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    textPreview: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        lineHeight: '21@ms',
    },
});

export default EditContentView;
