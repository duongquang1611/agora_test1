import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { DATA_URL, staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE, HISTORY_ROUTE, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { getConfig } from 'utilities/convert';
import { formatJapanTime, formatMoney, getFinalOffer } from 'utilities/format';
import ItemImageTransaction from './ItemImageTransaction';

interface Props {
    item: any;
    hasButton?: boolean;
    firstTab?: boolean;
}

const HistoryItem = (props: Props) => {
    const { firstTab, item, hasButton } = props;
    const { product, offer = [], createdAt = '' } = item;
    const { brands, categories } = useSelector((state: any) => state.resource);
    const getBrandName = () => brands.find((brand: any) => brand.id === product?.brandId)?.name || '';
    const getCategoryName = () => categories.find((category: any) => category.id === product?.categoryId)?.name || '';
    const finalOffer: any = useMemo(() => getFinalOffer(offer), [offer]);
    // const guidePackageUrl = getConfig(staticValue.CONFIG_KEY.WEB_PACKAGING_INSTRUCTION)?.value;
    const guidePackageUrl = getConfig(staticValue.CONFIG_KEY.WEB_TUTORIAL)?.value;

    const onPressHandle = () => {
        firstTab
            ? navigate(HISTORY_ROUTE.DETAIL, {
                  transactionId: item?.id,
                  autoShowModal: true,
              })
            : navigate(ASSESSMENT_ROUTE.METHOD_ASSESSMENT, { productId: item?.product?.id });
    };

    const goToDetail = () => {
        navigate(HISTORY_ROUTE.DETAIL, { transactionId: item?.id });
    };

    const goToPackageGuide = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: guidePackageUrl || DATA_URL.guidePackage,
        });
    };

    return (
        <>
            <StyledTouchable customStyle={styles.container} onPress={goToDetail}>
                <View style={styles.card}>
                    <StyledText originValue={formatJapanTime(createdAt)} customStyle={styles.date} />
                    <View style={styles.container}>
                        <ItemImageTransaction
                            image={product?.images?.[0]?.URL ? product?.images?.[0] : product?.images?.[1]}
                            customStyle={styles.image}
                        />
                        {/* <StyledFastImage
                            source={
                                product?.images?.[0]?.URL || product?.images?.[1]?.URL
                                    ? {
                                          uri: product?.images[0].URL || product?.images[1].URL,
                                      }
                                    : Images.photo.assessment.imgProductDefault
                            }
                            customStyle={styles.image}
                        /> */}
                        <View style={styles.flex1}>
                            <View style={styles.content}>
                                <StyledText i18nText={'history.category'} customStyle={styles.labels} />
                                <StyledText
                                    numberOfLines={1}
                                    originValue={getCategoryName()}
                                    customStyle={styles.value}
                                />
                            </View>
                            <View style={styles.content}>
                                <StyledText i18nText={'history.brand'} customStyle={styles.labels} />
                                <StyledText numberOfLines={1} originValue={getBrandName()} customStyle={styles.value} />
                            </View>
                            <View style={styles.content}>
                                <StyledIcon source={Images.icons.price} size={18} customStyle={styles.iconPrice} />
                                <StyledText
                                    i18nText={'history.price'}
                                    i18nParams={{ price: formatMoney(finalOffer?.price || 0) }}
                                    customStyle={styles.price}
                                />
                            </View>
                        </View>
                    </View>
                    {hasButton ? (
                        <View style={styles.footer}>
                            <StyledButton
                                onPress={onPressHandle}
                                title={firstTab ? 'history.notifyShipButtonText' : 'history.assessmentButtonText'}
                                customStyle={styles.primaryButton}
                            />
                            {firstTab ? (
                                <StyledTouchable onPress={goToPackageGuide} customStyle={styles.textGuideContent}>
                                    <StyledText
                                        i18nText={'history.packingGuideButtonText'}
                                        customStyle={styles.guidePackage}
                                    />
                                </StyledTouchable>
                            ) : (
                                <View />
                            )}
                        </View>
                    ) : (
                        <View />
                    )}
                </View>
                <StyledTouchable onPress={goToDetail} hitSlop={20}>
                    <StyledIcon source={Images.icons.next} size={13} customStyle={styles.next} />
                </StyledTouchable>
            </StyledTouchable>
            <View style={styles.separator} />
        </>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    primaryButton: {
        marginVertical: 10,
        alignSelf: 'flex-start',
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: '90@s',
        width: '130@s',
        borderRadius: 3,
    },
    date: {
        color: Themes.COLORS.textOther,
        fontWeight: '300',
        fontSize: 14,
        lineHeight: 21,
        paddingVertical: 5,
    },
    footer: {
        marginTop: '10@vs',
        alignItems: 'center',
    },
    next: {
        marginHorizontal: 10,
    },
    price: {
        backgroundColor: Themes.COLORS.white,
        padding: 5,
        borderRadius: 5,
        lineHeight: 18,
        fontSize: '12@ms',
    },
    iconPrice: {
        backgroundColor: Themes.COLORS.wildSand,
        padding: 5,
        borderRadius: 5,
    },
    content: {
        flexDirection: 'row',
        marginHorizontal: 10,
        flex: 1,
        alignItems: 'center',
        marginBottom: 5,
    },
    value: {
        backgroundColor: Themes.COLORS.white,
        borderRadius: 5,
        lineHeight: 18,
        paddingRight: '35@s',
        paddingLeft: '5@s',
        fontSize: '12@ms',
    },
    labels: {
        backgroundColor: Themes.COLORS.wildSand,
        padding: '5@ms',
        borderRadius: 5,
        lineHeight: 18,
        fontSize: '12@ms',
        width: '72@s',
        textAlignVertical: 'center',
    },
    tabView: {
        flex: 1,
        padding: '10@ms',
        backgroundColor: Themes.COLORS.white,
    },
    card: {
        paddingHorizontal: '20@s',
        paddingVertical: '10@vs',
        flex: 1,
    },
    guidePackage: {
        color: Themes.COLORS.primary,
        marginTop: '5@vs',
    },
    separator: {
        marginLeft: '20@s',
        height: 1,
        backgroundColor: Themes.COLORS.separatorColor,
    },
    textGuideContent: {
        marginTop: '24@vs',
        marginBottom: '27@vs',
    },
});
export default HistoryItem;
