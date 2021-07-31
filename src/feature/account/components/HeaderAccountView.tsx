import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface HeaderAccountProps {
    phone: string;
    customStyle?: StyleProp<ViewStyle>;
}

const HeaderAccountView = (props: HeaderAccountProps) => {
    const { phone = '', customStyle } = props;
    return (
        <>
            <View style={[styles.container, customStyle]}>
                <StyledIcon source={Images.icons.account.avatarCircle} size={35} />
                <StyledText originValue={phone} customStyle={styles.textPhone} />
            </View>
            <View style={styles.separator} />
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPhone: {
        marginLeft: '15@s',
    },
    separator: {
        backgroundColor: Themes.COLORS.accountView.background,
        height: 30,
    },
});

export default React.memo(HeaderAccountView);
