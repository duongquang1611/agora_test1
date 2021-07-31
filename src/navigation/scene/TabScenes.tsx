import React from 'react';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StyledTabBar from 'navigation/components/StyledTabBar';
import { useTranslation } from 'react-i18next';
import Images from 'assets/images';

// Screen
import HomeView from 'feature/home/HomeView';
import NotificationView from 'feature/notification/NotificationView';
import HistoryScreen from 'feature/history/HistoryScreen';
import AssessmentView from 'feature/assessment/AssessmentView';
import AccountView from 'feature/account/AccountView';

const MainTab = createBottomTabNavigator();

const MainTabContainer = () => {
    const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeView,
            icon: Images.icons.tab.home.inActive,
            iconActive: Images.icons.tab.home.active,
            sizeIcon: {
                width: 26,
                height: 24,
            },
        },
        {
            name: TAB_NAVIGATION_ROOT.HISTORY_ROUTE.ROOT,
            title: t('tab.history'),
            component: HistoryScreen,
            icon: Images.icons.tab.history.inActive,
            iconActive: Images.icons.tab.history.active,
            sizeIcon: {
                width: 23,
                height: 23,
            },
        },
        {
            name: TAB_NAVIGATION_ROOT.ASSESSMENT_ROUTE.ROOT,
            title: t('tab.assessment'),
            component: AssessmentView,
            icon: Images.icons.tab.assessment.inActive,
            iconActive: Images.icons.tab.assessment.active,
            sizeIcon: {
                width: 29,
                height: 17,
            },
        },
        {
            name: TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT,
            title: t('tab.notice'),
            component: NotificationView,
            icon: Images.icons.tab.notification.inActive,
            iconActive: Images.icons.tab.notification.active,
            sizeIcon: {
                width: 23,
                height: 22,
            },
        },
        {
            name: TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ROOT,
            title: t('tab.account'),
            component: AccountView,
            icon: Images.icons.tab.account.inActive,
            iconActive: Images.icons.tab.account.active,
            sizeIcon: {
                width: 22,
                height: 22,
            },
        },
    ];
    return (
        <MainTab.Navigator
            tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}
            initialRouteName={TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT}
        >
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </MainTab.Navigator>
    );
};

export default MainTabContainer;
