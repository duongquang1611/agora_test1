import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledText } from 'components/base';
import { staticValue } from 'feature/staticData';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { ScaledSheet } from 'react-native-size-matters';
import { openURL } from 'utilities/helper';

const ItemMessageWithName = (props: any) => {
    const { name = '', message = '', customStyle, item = {} } = props;
    const { t } = useTranslation();
    const isImage = item?.messageType === staticValue.TYPE_MESSAGE_IMAGE;
    const isOffer = item?.messageType === staticValue.TYPE_MESSAGE_OFFER;

    const renderMessageImage = () => {
        const dataImage = {
            URL: item?.image || '',
            URL50x50: item?.image50x50 || '',
            URL400x400: item?.image400x400 || '',
        };
        return (
            <View style={styles.messageImageContainer}>
                <ProgressiveImage {...dataImage} style={styles.messageImage} />
            </View>
        );
    };

    return (
        <>
            {!isOffer && (
                <View style={[styles.containerItem, isImage ? styles.containerMessage : {}, customStyle]}>
                    <View style={isImage ? styles.nameWithImage : styles.nameWithMessage}>
                        {isImage && (
                            <StyledText
                                i18nText={'videoView.message'}
                                i18nParams={{ name: t(name) }}
                                customStyle={styles.textName}
                            />
                        )}
                        {!isImage && (
                            <Hyperlink onPress={(url) => openURL(url)} linkStyle={styles.linkStyle}>
                                <Text style={styles.textMessage}>
                                    <StyledText
                                        i18nText={'videoView.message'}
                                        i18nParams={{ name: t(name) }}
                                        customStyle={styles.textName}
                                    />
                                    {item?.messageType === staticValue.TYPE_MESSAGE_TEXT ? message : ''}
                                </Text>
                            </Hyperlink>
                        )}
                    </View>
                    {isImage && renderMessageImage()}
                    {/* {isImage && <StyledFastImage source={{ uri: item?.image }} customStyle={styles.messageImageContainer} />} */}
                </View>
            )}
        </>
    );
};

const styles = ScaledSheet.create({
    containerItem: {
        backgroundColor: Themes.COLORS.assessment.bgInput,
        alignSelf: 'flex-start',
        borderRadius: '22.5@vs',
        paddingVertical: '12@vs',
        marginBottom: '5@vs',
        paddingHorizontal: '15@s',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    containerMessage: {
        backgroundColor: Themes.COLORS.transparent,
        paddingLeft: 0,
    },
    textName: {
        fontSize: '12@ms',
        fontWeight: '600',
        color: Themes.COLORS.white,
    },
    textMessage: {
        fontSize: '12@ms',
        fontWeight: '600',
        color: Themes.COLORS.white,
        flex: 1,
        flexWrap: 'wrap',
    },
    messageImageContainer: {
        width: '100@s',
        height: '120@vs',
        marginLeft: '2@s',
    },
    messageImage: {},
    nameWithImage: {
        backgroundColor: Themes.COLORS.assessment.bgInput,
        alignSelf: 'flex-start',
        borderRadius: 50,
        maxWidth: '100%',
        paddingVertical: '12@vs',
        paddingHorizontal: '15@s',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '5@s',
    },
    nameWithMessage: {
        flexDirection: 'row',
    },
    linkStyle: {
        textDecorationLine: 'underline',
    },
});

export default memo(ItemMessageWithName);
