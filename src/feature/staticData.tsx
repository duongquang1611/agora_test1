/* eslint-disable no-shadow */
import Images from 'assets/images';
import i18next from 'i18next';
import Config from 'react-native-config';
import { isIos } from 'utilities/helper';
import appInfo from '../../app.json';

export const AGORA = {
    agoraAppId: 'd62d96fc554a4972b4c3ed2979470ca6',
    token: '006d62d96fc554a4972b4c3ed2979470ca6IACcmi5O9tA+sYFkldSV5/IVpGPlshksgwy5lfrkgJdJWja3aTAAAAAAEADGdujzsW8GYQEAAQCxbwZh',
    channelName: 'seminar_test',
    uid: 0,
};

const staticValue = {
    TYPE_OF_IMAGE: {
        FRONT: 1,
        BACK: 2,
    },
    ENUM_MEMBER_ID_TYPE: {
        DRIVING_LICENSE: 1,
        HEALTH_INSURANCE: 2,
        PASSPORT: 3,
        ID_CARD: 4,
        ARC: 5,
    },
    TAB_INDEX: {
        SUCCESS: 1,
        SENT: 2,
        REJECTED: 3,
    },
    DEFAULT_VALUE: 1,
    assessment: {
        URL: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    CELL_OTP: 4,
    TYPE_BRAND_NOT_EXIST: 5,
    HAS_BRAND: 1,
    NO_BRAND: 0,
    SIZE_PROGRESS: 220,
    FILL_PROGRESS: 1000,
    ROTATE_PROGRESS: -360,
    TIME_PROGRESS: 600000,
    VALUE_PROGRESS: 100,
    VALUE_OFF_SECOND: 60,
    TIME_WAIT_ADMIN: 600,
    TIME_OFF: '00:00',
    SECOND_MIN: 10,
    NO_VALUE: 0,
    INDEX_VIDEO_CALL: 0,
    INDEX_CONVERSATION: 1,
    ID_USER: 2,
    INVITE_CODE_LENGTH: 6,
    TAKE: 10,
    PAGE_INDEX: 1,
    ID_NO_BRAND: 1,
    LENGTH_PHONE_WITH_FORMAT: 14,
    LENGTH_PHONE: 11,
    LENGTH_START_POSTAL_CODE: 3,
    LENGTH_END_POSTAL_CODE: 4,
    TYPE_IMAGE_WHOLE: 1,
    TYPE_IMAGE_LOGO: 2,
    ID_USER_VIDEO_CALL: -1,
    CURRENCY: '円',
    POSTAL_CODE: '〒',
    SECOND_IN_DAY: 86400,
    APP_DISPLAY_NAME: appInfo.displayName,
    ADMIN_TYPE: 2,
    TYPE_MESSAGE_TEXT: 1,
    TYPE_MESSAGE_IMAGE: 2,
    TYPE_MESSAGE_OFFER: 3,
    TIME_OFF_OFFER: 3000,
    SIZE_LOADING: 42,
    LANDING_PAGE: `${Config.ADMIN_URL}/lp`,
    TWO_FACE_IMAGE: 2,
    LENGTH_MIN_PARCEL_CODE: 11,
    LENGTH_MAX_PARCEL_CODE: 13,
    ALL_TRANSACTION_STATUS: {
        PENDING: 1, // cho admin accept kiem dinh
        SUCCESS: 2, // tab 1 co offer thanh cong, chua gui hang
        FAILED: 3, // tab 3, admin chap nhan kiem dinh, co offeer nhung bi user tu choi
        SENT: 4, // da gui hang
        TIME_OUT: 5, // admin chap nhan kiem dinh, chua co offer
        DONE: 6, // user nhan dc tien, admin nhan dc hang
        CANCEL: 7, // admin k chap nhan kiem dinh
        APPRAISING: 8, // transaction can remove khi vao app
        SENT_DONE: 9, // sent + done, tab2
        NOT_OFFER_FAILED: 10,
    },
    // key async storage
    KEY_SHOW_NOTIFICATION: 'KEY_SHOW_NOTIFICATION',
    KEY_SHOW_TAKE_CERTIFICATE: 'KEY_SHOW_TAKE_CERTIFICATE',
    KEY_SHOW_SLIDE_METHOD: 'KEY_SHOW_SLIDE_METHOD',
    KEY_SHOW_PREVIEW_CERTIFICATE: 'KEY_SHOW_PREVIEW_CERTIFICATE',
    KEY_OFFER_SUCCESS: 'KEY_OFFER_SUCCESS',
    LENGTH_ADDRESS: 80,
    MINUTE_VALUE: 60000,
    KEY_SHOW_MODAL_TUTORIAL: 'KEY_SHOW_MODAL_TUTORIAL',
    URL: 'https://nisshingeppo.studio.site/5',
    TITLE_HELP: 'TITLE HELP',
    ONE_SECOND: 1000,
    CONFIG_KEY: {
        APP_HOME_BANNER: 'APP_HOME_BANNER',
        APP_LOGO: 'APP_LOGO',
        LANGUAGE_VERSION: 'LANGUAGE_VERSION',
        RESOURCE_VERSION: 'RESOURCE_VERSION',
        TIME_APP_WAITING: 'TIME_APP_WAITING',
        WEB_CONTACT: 'WEB_CONTACT',
        WEB_NOTIFICATION: 'WEB_NOTIFICATION',
        WEB_PACKAGING_INSTRUCTION: 'WEB_PACKAGING_INSTRUCTION',
        WEB_POLICY: 'WEB_POLICY',
        WEB_TERM: 'WEB_TERM',
        WEB_TUTORIAL: 'WEB_TUTORIAL',
    },
    ENABLED_NOTIFICATION: 1,
    DISABLED_NOTIFICATION: 2,
    TIME_OUT_DISMISS: 500,
    DEFAULT_ERROR_MESSAGE: 'エラーが発生しました。しばらくしてからもう一度試してみてください。',
    MAX_NOTIFICATION_TEXT: '99+',
    PRICE_MAX_LENGTH: 10,
    MAX_NOTIFICATION: 99,
    ZOOM_CAM: {
        MAX_ZOOM: 7, // iOS only
        ZOOM_F: isIos ? 0.007 : 0.08,
    },
    NOTIFICATION_ALL: 2,
    NOTIFICATION_PERSONAL: 1,
    DEFAULT_IMAGE: 'DEFAULT_IMAGE',
    AGORA_APP_ID: Config.AGORA_APP_ID,
    ERROR_START_CAM: 1003,
    // DEFAULT_IMAGE: 'https://medifactia.com/wp-content/uploads/2018/01/placeholder.png',
};

export const STORE_APP_ID = {
    ANDROID: 'jp.apps.sellme',
    IOS: '1558784171',
};

const EventSocket = {
    CONVERSATIONS: 'conversations',
    MESSAGES: 'messages', // get api khi reconnect
    READ_MESSAGE: 'read_message',
    OFFERS: 'offers', // can emit lai event socket khi nhan duoc data
    CREATE_ROOM: 'create_room', // can emit lai event socket khi nhan duoc data
    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',
    VIDEO_CALL: 'video_call', // can emit lai event socket khi nhan duoc data
    CLOSE_TRANSACTION: 'close_transaction', // can emit lai event socket khi nhan duoc data
    REFUSE_TRANSACTION: 'refuse_transaction', // can emit lai event socket khi nhan duoc data
    START_TYPING: 'start_typing',
    END_TYPING: 'end_typing',
    TYPING: 'typing',
    OFF_TYPING: 'off_typing',
};

export enum TAB_HISTORY_TRANSACTION {
    PENDING_SHIP,
    SENT_DONE,
    NOT_SELL,
}

const OFFER_STATUS = {
    PENDING: 1,
    NO: 2,
    YES: 3,
};

export enum IS_READ {
    UNREAD,
    READ,
}

export { staticValue, EventSocket, OFFER_STATUS };

export const ICON_CATEGORY = [
    {
        id: 0,
        iconLeft: Images.icons.assessment.iconBag,
        iconRight: Images.icons.assessment.iconNext,
    },
    {
        id: 1,
        iconLeft: Images.icons.assessment.iconShoes,
        iconRight: Images.icons.assessment.iconNext,
    },
    {
        id: 2,
        iconLeft: Images.icons.assessment.iconClothing,
        iconRight: Images.icons.assessment.iconNext,
    },
    {
        id: 3,
        iconLeft: Images.icons.assessment.iconWallet,
        iconRight: Images.icons.assessment.iconNext,
    },
    {
        id: 4,
        iconLeft: Images.icons.assessment.iconPrecious,
        iconRight: Images.icons.assessment.iconNext,
    },
];

export const METHOD_ASSESSMENT = [
    {
        id: 0,
        iconActive: Images.icons.assessment.iconVideoActive,
        icon: Images.icons.assessment.iconVideo,
        name: i18next.t('assessment.videoCall'),
        size: {
            width: 28,
            height: 21,
        },
        isActive: true,
    },
    {
        id: 1,
        iconActive: Images.icons.assessment.iconMessageActive,
        icon: Images.icons.assessment.iconMessage,
        name: i18next.t('assessment.message'),
        size: {
            width: 27,
            height: 26,
        },
        isActive: false,
    },
];

export const SLIDE_ASSESSMENT = [
    {
        id: 0,
        title: i18next.t('assessment.slide.titleOne'),
        image: Images.photo.assessment.slideOne,
        content: i18next.t('assessment.slide.contentOne'),
        width: 194,
        height: 102,
    },
    {
        id: 1,
        title: i18next.t('assessment.slide.titleTwo'),
        image: Images.photo.assessment.slideTwo,
        content: i18next.t('assessment.slide.contentTwo'),
        width: 198,
        height: 101,
    },
];

export const DATA_CONFIRM = [
    {
        id: 1,
        title: i18next.t('assessment.wholePhoto'),
        image: 'https://www.vascara.com/uploads/cms_productmedia/2018/November/16/42461_1542338655.jpg',
    },
    {
        id: 2,
        title: i18next.t('assessment.logoPhoto'),
        image: 'https://www.vascara.com/uploads/cms_productmedia/2018/November/16/42461_1542338655.jpg',
    },
];

export const TYPE_CATEGORY = [
    {
        type: 1,
        title: i18next.t('assessment.logoInside'),
        image: [Images.photo.assessment.imgWhole, Images.photo.assessment.imgLogoNew],
    },
    {
        type: 2,
        title: i18next.t('assessment.exampleShoes'),
        image: [Images.photo.assessment.imgShoesWhole, Images.photo.assessment.imgShoesLogo],
    },
    {
        type: 3,
        title: i18next.t('assessment.exampleClothing'),
        image: [Images.photo.assessment.imgClothing],
    },
    {
        type: 4,
        title: '',
        image: [],
    },
];

export const POSTAL_CODE = {
    start: '000',
    end: '0000',
};

export const OTP = {
    valid: '0000',
};

export const ACCOUNT_TYPE = [
    {
        id: 1,
        name: i18next.t('transfer.accountType.usually'),
    },
];

export const DATA_URL = {
    guidePackage: 'https://nisshingeppo.studio.site/5',
    manual: 'https://sellme.jp/guide',
    contact: 'https://sellme.jp/contact',
    policy: 'https://sellme.jp/privacy',
    terms: 'https://sellme.jp/terms',
};

export enum NAVIGATE_TYPE {
    SETTING,
    REQUEST_PAYMENT,
    VIDEO_AND_CHAT,
    NOTIFY,
}

export const TRANSFER = {
    LENGTH_ACCOUNT_NUMBER: 7,
    LENGTH_BRANCH_CODE: 3,
};

export const VIDEO_CALL = {
    me: 'videoView.me',
    other: 'videoView.namePersonReview',
    url: {
        remote: 'https://m.dw.com/image/50444313_101.jpg',
        me: 'https://i.pinimg.com/736x/aa/15/00/aa150050eb5824b2e618728b96e335a7.jpg',
    },
};

export enum STATUS_OFFER {
    PENDING = 1,
    AGREE = 3,
    REJECT = 2,
}

export enum TYPE_NOTIFY {
    ME = 1,
    ALL,
}
export enum KEY_NOTIFY {
    SHIPPING_SUCCESS,
    GENERAL_NOTIFY,
    TAG_NOTIFY,
    REJECT_REVIEW,
    VIDEO_CALL,
    MESSAGE,
    OFFER_COST,
    CREATE_ORDER_SUCCESS,
    DEAL4,
    DEAL6,
    PRODUCT_PAID,
    PERSON_INFO_INVALID,
}
export const NOTIFICATION = {
    list: [
        {
            id: 0,
            type: TYPE_NOTIFY.ME,
            image: Images.photo.assessment.imgShoesLogo,
            title: '取引が完了しました。発送を行ってください。',
            data: {},
            key: KEY_NOTIFY.CREATE_ORDER_SUCCESS,
            time: new Date(),
        },
        {
            id: 1,
            type: TYPE_NOTIFY.ALL,
            title: '新着のお知らせが〇件あります。',
            data: {},
            time: new Date('2021-02-17T03:42:28.542Z'),
        },
        {
            id: 2,
            type: TYPE_NOTIFY.ALL,
            title: 'セルミーへようこそ。さっそく査定してみまし\nょう。',
            data: {},
            time: new Date('2021-02-16T03:42:28.542Z'),
        },
        {
            id: 3,
            type: TYPE_NOTIFY.ME,
            image: Images.photo.assessment.imgShoesLogo,
            title: '取引が完了しました。発送を行ってください。',
            data: {},
            time: new Date(),
        },
        {
            id: 4,
            type: TYPE_NOTIFY.ALL,
            title: 'セルミーへようこそ。みまし',
            data: {},
            time: new Date('2021-02-12T03:33:28.542Z'),
        },
        {
            id: 5,
            type: TYPE_NOTIFY.ALL,
            title: 'セルミーへようこそ。さっそく',
            data: {},
            time: new Date('2021-01-12T13:24:28.542Z'),
        },
    ],
};

export enum TYPE_REVIEW {
    VIDEO = 1,
    CHAT = 2,
}

export const TYPE_CARD = {
    FRONT_BACK_CARD: {
        FRONT: 'frontImage',
        BACK: 'backImage',
    },
};

export enum RedirectType {
    HOME = 1,
    TRANSACTION = 3,
    OFFER = 4,
    MEMBER_BANK = 5,
    MEMBER_ID_CARD = 6,
    SHIP = 7,
    MEMBER_ADDRESS = 8,
    UPDATE_PARCEL_CODE = 9,
    CONVERSATION = 10,
    VIDEO_CALL = 11,
    REFUSED_TRANSACTION = 12,
    DETAIL_TRANSACTION = 2,
}

export const PERMISSION_APP = {
    camera: 'camera',
    audio: 'audio',
    photo: 'photo',
};
