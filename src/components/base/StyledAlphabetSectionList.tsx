import React, { useRef } from 'react';
import { RefreshControl, SectionListProps, StyleProp, View, ViewStyle } from 'react-native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { ScaledSheet } from 'react-native-size-matters';
import { Themes } from 'assets/themes';
import { formatDataByAlphabet } from 'utilities/format';
import { isIos } from 'utilities/helper';
import NoData from './StyledNoData';

interface Props extends SectionListProps<any> {
    [key: string]: any;
    loading?: boolean;
    refreshing?: boolean;
    sections: any;
    noDataText?: string;
    ListHeaderComponent?: React.FunctionComponent;
    scrollEnabled?: boolean;
    noDataCanRefresh?: boolean;
    customStyle?: any;
    onRefresh?(): void;
    onNoDataRefresh?(): void;
    keyGroup: string;
    isGrouped?: boolean;
    getItemLayout?: any;
    customStyleNoData?: StyleProp<ViewStyle>;
}

const StyledAlphabetSectionList = (props: Props) => {
    const list: any = useRef(null);
    const {
        loading,
        sections, // sections data format by lib react-native-alphabet-sectionlist
        ListHeaderComponent,
        refreshing,
        customStyle,
        onRefresh,
        onNoDataRefresh,
        noDataText,
        noDataCanRefresh,
        keyGroup,
        isGrouped = false,
        getItemLayout,
        customStyleNoData,
    } = props;

    const contentContainerStyle: any = {};
    let sectionsFormat: any = {};
    sectionsFormat = isGrouped ? sections : formatDataByAlphabet(sections, keyGroup);
    const hasData = Object.keys(sectionsFormat).length !== 0;
    if (!hasData) {
        contentContainerStyle.flex = 1;
        contentContainerStyle.alignItems = 'center';
        contentContainerStyle.justifyContent = 'center';
    }
    let styleContents;
    if (typeof ListHeaderComponent === 'undefined' && !hasData) {
        styleContents = [contentContainerStyle, customStyle];
    } else {
        styleContents = customStyle;
    }

    const handleRefresh = () => {
        onRefresh?.();
    };

    const handleNoDataRefresh = () => {
        onNoDataRefresh?.();
    };

    const renderNoData = () => {
        return (
            <NoData
                customStyle={[styles.noData, customStyleNoData]}
                loading={loading}
                text={noDataText}
                canRefresh={noDataCanRefresh}
                onRefresh={handleNoDataRefresh}
            />
        );
    };
    const renderSeparator = () => {
        return <View style={styles.separator} />;
    };

    return hasData ? (
        <AlphabetSectionList
            ref={list}
            data={sectionsFormat}
            contentContainerStyle={styleContents}
            stickySectionHeadersEnabled={true}
            initialNumToRender={20}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            ListEmptyComponent={renderNoData}
            sectionHeaderStyle={styles.styleHeader}
            sectionHeaderTextStyle={styles.textHeader}
            sectionListFontStyle={styles.textAlpha}
            ItemSeparatorComponent={renderSeparator}
            refreshControl={
                <RefreshControl
                    refreshing={!!refreshing}
                    colors={[Themes.COLORS.primary]}
                    tintColor={Themes.COLORS.primary}
                    onRefresh={handleRefresh}
                />
            }
            getItemLayout={getItemLayout}
            {...props}
        />
    ) : (
        renderNoData()
    );
};
const styles = ScaledSheet.create({
    textAlpha: {
        color: Themes.COLORS.primary,
        paddingRight: '5@s',
        marginVertical: isIos ? '2@vs' : '-0.5@vs',
        fontSize: '12@ms',
    },
    textHeader: {
        fontSize: '14@ms',
        color: Themes.COLORS.black,
        paddingHorizontal: '15@s',
        fontWeight: 'bold',
    },
    styleHeader: {
        height: '40@vs',
        justifyContent: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: Themes.COLORS.gallery,
        marginLeft: '20@s',
    },
    noData: {
        alignSelf: 'center',
        flex: 1,
    },
});
export default React.memo(StyledAlphabetSectionList);
