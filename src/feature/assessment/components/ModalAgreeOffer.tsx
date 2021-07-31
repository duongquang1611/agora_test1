import Images from 'assets/images';
import { Themes } from 'assets/themes';
import StyledModalChildren from 'components/StyledModalChildren';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

const ModalAgreeOffer = () => {
    return (
        <StyledModalChildren
            customStyleTitle={styles.title}
            customStyle={styles.container}
            icon={Images.icons.videoCall.shakeHand}
            title="videoView.acceptOffer"
            customSizeIcon={75}
        />
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '305@s',
        height: '194@vs',
        backgroundColor: Themes.COLORS.white,
        borderRadius: 14,
        paddingVertical: '10@vs',
    },
    title: {
        fontSize: '20@ms',
        lineHeight: '30@vs',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: '25@vs',
        marginBottom: '15@vs',
    },
    textBtn: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
        color: Themes.COLORS.tutorialView.textBtnAge,
        flex: 1,
        textAlign: 'center',
        padding: 10,
    },
    textBtnYes: {
        fontWeight: '600',
    },
    separator: {
        height: '100%',
        backgroundColor: Themes.COLORS.silver,
        width: 0.5,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '25@vs',
    },
    btn: {
        flex: 1,
        height: '40@vs',
        borderRadius: 3,
        marginHorizontal: 10,
    },
});

export default ModalAgreeOffer;
