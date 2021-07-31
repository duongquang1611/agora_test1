import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import * as React from 'react';
import { View, Text, Linking } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatTimeNotify } from 'utilities/format';
import Hyperlink from 'react-native-hyperlink';
import appInfo from '../../../../app.json';

const NotificationItem = (props: any) => {
    const { item, customStyle, onPress, isClick } = props;
    const { createdAt, content = '' } = item;
    const timeFormat = formatTimeNotify(createdAt);
    return (
        <StyledTouchable
            customStyle={[
                styles.containerItem,
                customStyle,
                { backgroundColor: isClick ? Themes.COLORS.white : Themes.COLORS.notification.background },
            ]}
            onPress={onPress}
        >
            <View style={styles.containerAvatar}>
                <View>
                    <StyledText originValue={appInfo.displayName.toUpperCase()} customStyle={styles.textAppName} />
                </View>
                {/* <StyledImage source={imageURL} customStyle={styles.image} /> */}
            </View>

            <View style={styles.textContent}>
                {/* <StyledText originValue={content} customStyle={styles.textNotify} /> */}
                <Hyperlink
                    onPress={(url) => {
                        Linking.openURL(url);
                        onPress();
                    }}
                    linkStyle={styles.textLink}
                >
                    <Text style={styles.textNotify}>{content}</Text>
                </Hyperlink>
                <StyledText originValue={timeFormat} customStyle={styles.textTime} />
            </View>
            <StyledIcon source={Images.icons.arrowRight} size={12} customStyle={styles.arrow} />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    containerItem: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        paddingRight: '16@s',
        alignItems: 'center',
        paddingVertical: '20@vs',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    containerAvatar: {
        height: '50@s',
        width: '50@s',
        backgroundColor: Themes.COLORS.primary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginHorizontal: '16@s',
    },
    textAppName: {
        fontSize: '10@ms',
        fontWeight: 'bold',
        color: Themes.COLORS.white,
    },
    textNotify: {
        flexWrap: 'wrap',
        fontSize: '13@ms',
        fontWeight: '300',
        marginBottom: '12@vs',
        marginTop: '5@vs',
    },
    textTime: {
        fontSize: '10@ms',
        fontWeight: '300',
        color: Themes.COLORS.textSecondary,
    },
    textContent: {
        flex: 1,
    },
    arrow: {
        alignSelf: 'center',
    },
    textLink: {
        color: Themes.COLORS.notification.link,
        fontSize: '13@ms',
        textDecorationLine: 'underline',
    },
});

export default NotificationItem;
