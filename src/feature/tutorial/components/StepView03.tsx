import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImage } from 'components/base';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const StepView03: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StyledImage source={Images.icons.intro.step03.main} resizeMode="contain" customStyle={styles.image} />
            {/* <StyledIcon
                source={Images.icons.intro.step03.congratulation}
                size={112}
                customStyle={styles.congratulation}
            /> */}
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        width: '279@s',
        height: '353@s',
        alignSelf: 'center',
        marginTop: '45@vs',
    },
    headerContainer: {
        backgroundColor: Themes.COLORS.primary,
        height: '80@vs',
    },
    customTitleHeader: {
        fontSize: '18@ms',
        lineHeight: '23.4@vs',
        fontWeight: '700',
        color: Themes.COLORS.white,
    },
    user: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '165@vs',
    },
    chat: {
        position: 'absolute',
        bottom: '25@vs',
        right: '30@s',
    },
    social: {
        height: '66@vs',
        marginBottom: '25@vs',
    },
    congratulation: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '45@vs',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
export default StepView03;
