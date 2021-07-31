import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FirstTimeShip from './FirstTimeShip';
import FollowStepPurchase from './FollowStepPurchase';

const ModalTutorialShip = (props: any) => {
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const { modal } = props;
    const TUTORIAL_SHIP = [<FirstTimeShip key={0} />, <FollowStepPurchase key={1} />];
    const renderItem = ({ item, index }: any) => {
        return <View key={index}>{item}</View>;
    };
    const { length: totalStep } = TUTORIAL_SHIP;
    const pagination = () => {
        return (
            <Pagination
                dotsLength={totalStep}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerDot}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
            />
        );
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                style={styles.viewModal}
                onPress={() => {
                    activeSlide ? modal?.dismiss() : null;
                }}
            />
            <View style={styles.containerModal}>
                <Carousel
                    data={TUTORIAL_SHIP}
                    renderItem={renderItem}
                    onSnapToItem={(index) => {
                        setActiveSlide(index);
                    }}
                    sliderWidth={scale(328)}
                    itemWidth={scale(328)}
                />
                {pagination()}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerModal: {
        width: '328@s',
        backgroundColor: Themes.COLORS.white,
        borderRadius: 10,
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: '22@ms',
        lineHeight: '33@vs',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: '25@vs',
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
        height: '48@vs',
        borderRadius: 3,
        marginHorizontal: 10,
    },
    normalText: {
        fontSize: '17@ms',
        lineHeight: '22.5@vs',
        fontWeight: '300',
        color: Themes.COLORS.videoCallView.textOffer,
        marginTop: 15,
    },
    containerDot: {
        backgroundColor: Themes.COLORS.white,
        paddingBottom: '40@vs',
        alignSelf: 'center',
    },
    dotStyle: {
        borderRadius: 5,
        marginHorizontal: -5,
        backgroundColor: Themes.COLORS.primary,
    },
    inactiveDotStyle: {
        borderRadius: 5,
        marginHorizontal: -5,
        backgroundColor: Themes.COLORS.dustyGray,
    },
    viewModal: {
        backgroundColor: Themes.COLORS.modalShipBg,
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ModalTutorialShip;
