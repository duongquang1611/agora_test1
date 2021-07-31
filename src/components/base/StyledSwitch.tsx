import * as React from 'react';
import { Switch, SwitchProps } from 'react-native';
import { Themes } from 'assets/themes';

interface StyledSwitchProps extends SwitchProps {
    toggle(): any;
    isEnabled: boolean;
}

const StyledSwitch = (props: StyledSwitchProps) => {
    const { isEnabled = true, toggle } = props;
    return (
        <Switch
            trackColor={{ false: Themes.COLORS.jumbo32, true: Themes.COLORS.emerald }}
            thumbColor={Themes.COLORS.white}
            ios_backgroundColor={Themes.COLORS.jumbo32}
            onValueChange={toggle}
            value={isEnabled}
        />
    );
};

export default React.memo(StyledSwitch);
