import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import { VIDEO_CALL } from 'feature/staticData';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { TypingAnimation } from 'react-native-typing-animation';

const ItemTyping = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <StyledText
                i18nText={'videoView.message'}
                i18nParams={{ name: t(VIDEO_CALL.other) }}
                customStyle={[styles.textName]}
            />
            <TypingAnimation
                dotColor={Themes.COLORS.white}
                dotMargin={3}
                dotAmplitude={3}
                dotSpeed={0.25}
                dotRadius={2.5}
                dotX={10}
                dotY={-3}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.assessment.bgInput,
        borderRadius: '22.5@vs',
        maxWidth: '100%',
        paddingVertical: '12@vs',
        marginBottom: '5@vs',
        paddingHorizontal: '15@s',
        paddingRight: '40@s',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginHorizontal: '20@s',
    },
    textName: {
        fontSize: '12@ms',
        fontWeight: '600',
        color: Themes.COLORS.white,
    },
});

export default memo(ItemTyping);
