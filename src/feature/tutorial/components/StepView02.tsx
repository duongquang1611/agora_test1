import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage } from 'components/base';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const StepView02: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StyledImage source={Images.icons.intro.step02.main} resizeMode={'contain'} customStyle={styles.image} />
            <StyledIcon source={Images.icons.intro.step02.user} size={100} customStyle={styles.user} />
            <StyledIcon source={Images.icons.intro.step02.chat} size={142} customStyle={styles.chat} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        width: '327@s',
        height: '408@s',
        marginTop: '20@vs',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
        bottom: '150@vs',
        zIndex: 1,
    },
    chat: {
        position: 'absolute',
        bottom: '-5@vs',
        right: '-20@s',
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
export default StepView02;
