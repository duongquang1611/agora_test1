import { updateBlacklist } from 'app-redux/blacklist/actions';
import { updateCommon } from 'app-redux/common/actions';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import HeaderIntroView from './components/HeaderIntroView';
import StepView01 from './components/StepView01';
import StepView02 from './components/StepView02';
import StepView03 from './components/StepView03';

const TutorialScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { APP_DISPLAY_NAME } = staticValue;
    const [activeSlide, setActiveSlide] = React.useState<number>(0);
    const TUTORIAL_COMPONENT = [<StepView01 key={0} />, <StepView02 key={1} />, <StepView03 key={2} />];
    const { length: totalStep } = TUTORIAL_COMPONENT;
    const refTutorial = React.useRef<any>();
    const renderItem = ({ item, index }: any) => {
        return <View key={index}>{item}</View>;
    };
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
    const onPressSkip = () => {
        dispatch(updateBlacklist({ showIntro: true }));
        dispatch(updateCommon({ showTutorial: false }));
    };
    return (
        <View style={styles.container}>
            <StyledHeader
                title={`${APP_DISPLAY_NAME.toUpperCase()}`}
                hasBack={false}
                customContainer={styles.headerContainer}
                hasBorderBottom={false}
                customTitleStyle={styles.customTitleHeader}
                customTitleContainer={styles.customTitleContainer}
            />
            <HeaderIntroView step={activeSlide} onPressSkip={onPressSkip} />
            <Carousel
                ref={refTutorial}
                data={TUTORIAL_COMPONENT}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
                sliderWidth={Metrics.screenWidth}
                itemWidth={Metrics.screenWidth}
            />
            {pagination()}
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    headerContainer: {
        backgroundColor: Themes.COLORS.primary,
        height: '80@vs',
        alignItems: 'center',
    },
    customTitleHeader: {
        fontSize: '18@ms',
        lineHeight: '23.4@vs',
        fontWeight: '700',
        color: Themes.COLORS.white,
        textAlign: 'center',
        marginTop: '12@vs',
    },
    containerDot: {
        backgroundColor: Themes.COLORS.transparent,
        bottom: '35@vs',
        alignSelf: 'center',
        position: 'absolute',
    },
    textTitle: {
        fontSize: '20@ms',
        lineHeight: '33@vs',
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: '30@vs',
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
    customTitleContainer: {
        justifyContent: 'center',
    },
});
export default TutorialScreen;
