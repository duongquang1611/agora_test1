import Images from 'assets/images';
import React, { memo } from 'react';
import { LayoutAnimation, Platform, TouchableOpacity, UIManager, ViewProps, View, StyleProp } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledText } from '.';

interface StyledDropDownProps extends ViewProps {
    children?: any;
    title: string;
    customStyleTitle?: StyleProp<ViewProps>;
    styleContainerTitle?: StyleProp<ViewProps>;
}

const StyledDropDown: React.FunctionComponent<StyledDropDownProps> = (props: StyledDropDownProps) => {
    const { children, title = '', customStyleTitle, styleContainerTitle } = props;
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const [expanded, setExpanded] = React.useState(false);
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    setExpanded(!expanded);
                }}
            >
                <View style={[styles.containerTitle, styleContainerTitle]}>
                    <StyledText i18nText={title} customStyle={[styles.textTitle, customStyleTitle]} />
                    <StyledIcon
                        source={Images.icons.arrowRight}
                        size={13}
                        customStyle={{ transform: [{ rotate: '90deg' }] }}
                    />
                </View>
            </TouchableOpacity>
            {expanded && children}
        </>
    );
};

const styles = ScaledSheet.create({
    containerTitle: {
        flexDirection: 'row',
        paddingVertical: '10@vs',
        paddingHorizontal: '15@s',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: '15@s',
        lineHeight: '22.5@vs',
        marginRight: 10,
        fontWeight: '300',
    },
});
export default memo(StyledDropDown);
