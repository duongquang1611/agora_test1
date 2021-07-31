import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ItemNoteCard = (props: any) => {
    const { dotCustomStyle, text = '', noteCustomStyle } = props;
    return (
        <View style={styles.container}>
            <View style={[styles.dot, dotCustomStyle]} />
            <StyledText i18nText={text} customStyle={[styles.noteItem, noteCustomStyle]} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '8@vs',
    },
    dot: {
        height: 4,
        width: 4,
        borderRadius: 5,
        backgroundColor: Themes.COLORS.black,
        marginLeft: 5,
        marginRight: 10,
        alignSelf: 'flex-start',
        marginTop: '10@vs',
    },
    noteItem: {
        fontSize: 14,
        lineHeight: '22@vs',
    },
});

export default ItemNoteCard;
