import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Picker from 'react-native-picker';
import { ScaledSheet } from 'react-native-size-matters';
import { initPicker } from 'utilities/helper';
import { StyledIcon, StyledText } from '..';
import useModal from '../modal/useModal';

const DEFAULT_HEIGHT = Metrics.screenHeight * 0.055;

interface PickerProps {
    dataList: Array<any>;
    onConfirm(item: string): void;
    label?: string;
    titleModalShowUp?: string;
    currentValue?: any;
    customStyle?: StyleProp<ViewStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customPickerIconStyle?: any;
    isPickerDisable?: boolean;
}

const StyledPicker = (props: PickerProps) => {
    const {
        isPickerDisable,
        customPickerIconStyle,
        currentValue,
        dataList,
        onConfirm,
        titleModalShowUp,
        customStyle,
        label: labelProp,
        customLabelStyle,
    } = props;
    const [item, setItem] = useState(currentValue || dataList[0]);
    const [label, setLabel] = useState(labelProp || '');
    const { t } = useTranslation();
    const modal = useModal();

    useEffect(() => {
        if (currentValue === '') {
            setItem('');
            setLabel(labelProp || '');
        } else currentValue && handleConfirm([currentValue]);
    }, [currentValue]);

    const handleConfirm = useCallback(
        (data: any) => {
            if (data[0]?.toString() === dataList.indexOf(item)?.toString()) {
                data.pop();
                data.push(dataList[0]);
            }
            setLabel('');
            setItem(data[0]?.toString());
            Picker.select(data);
            onConfirm(data[0]?.toString());
            modal.dismiss?.();
        },
        [item, dataList, modal],
    );

    const handleCancel = () => {
        modal.dismiss?.();
    };

    const handleShowPicker = () => {
        Keyboard.dismiss();
        modal.show?.({
            children: <View />,
            onBackdropPress: () => {
                Picker.hide();
                modal.dismiss();
            },
        });
        const newData = [];
        initPicker({
            pickerData: dataList,
            pickerTitleText: t(titleModalShowUp || 'picker.pickItem'),
            selectedValue: [dataList.indexOf(item)],
            onPickerConfirm: handleConfirm,
            onPickerCancel: handleCancel,
        });
        newData.push(item || dataList[0]);
        Picker.select(newData);
        Picker.show();
    };

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleShowPicker}
                style={[styles.contWholePicker, customStyle]}
                disabled={isPickerDisable || false}
            >
                <StyledText
                    i18nText={label || item.trim()}
                    customStyle={[
                        styles.txtItem,
                        customLabelStyle,
                        { color: label ? Themes.COLORS.placeHolderGray : Themes.COLORS.black },
                    ]}
                />
                {isPickerDisable ? null : (
                    <StyledIcon
                        source={Images.icons.profile.arrowPicker}
                        size={14}
                        customStyle={[styles.imgPicker, customPickerIconStyle]}
                    />
                )}
            </TouchableOpacity>
        </>
    );
};

const styles = ScaledSheet.create({
    contWholePicker: {
        backgroundColor: '#E6E6E7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        height: DEFAULT_HEIGHT,
        width: Metrics.screenWidth * 0.9,
    },
    txtItem: {
        textAlign: 'auto',
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
    },
    imgPicker: {
        height: DEFAULT_HEIGHT,
        aspectRatio: 5 / 9,
        position: 'absolute',
        right: 15,
    },
});

export default StyledPicker;
