import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface Props {
    onPress: () => void;
    customStyle?: StyleProp<ViewStyle>;
}

const UpdateCameraView = (props: Props) => {
    const { onPress, customStyle } = props;
    return (
        <StyledTouchable onPress={onPress} customStyle={[styles.container, customStyle]}>
            <StyledIcon source={Images.icons.camera} customStyle={styles.iconCam} size={30} />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        height: '50@s',
        width: '50@s',
        position: 'absolute',
        zIndex: 1,
        top: '15@vs',
        right: 0,
    },
    iconCam: {
        tintColor: Themes.COLORS.primary,
    },
});

export default UpdateCameraView;
