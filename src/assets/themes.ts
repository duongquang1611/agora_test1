const common = {
    white: '#fff',
    transparent: 'transparent',
    black: '#000',
    blue: 'blue',
    placeHolderGray: '#BFBBB6',
    borderInputError: '#CF0E0E',
    backgroundSectionHeader: '#F5F5F5',
    backgroundInput: 'rgba(118, 118, 128, 0.12)',
    backgroundModal: 'rgba(0, 0, 0, 0.7)',
    backgroundMessage: 'rgba(0, 0, 0, 0.1)',
};

const Light = {
    COLORS: {
        ...common,
        primary: '#4285F4',
        secondary: '#0F9D58',
        twine90: 'rgba(199, 155, 96, 0.9)',
        textPrimary: '#000000',
        textSecondary: '#939292',
        textOther: '#91887E',
        tussock: '#C1883C',
        mineShaft: '#333333',
        dustyGray: '#959191',
        silver: '#C4C4C4',
        westar: '#DCD8D2',
        concrete: '#F3F1F1',
        gallery: '#F0EFEF',
        cloudy: '#ADAAA7',
        jumbo32: 'rgba(120, 120, 128, 0.32)',
        emerald: '#32D74B',
        mercury: '#E1E1E1',
        boulder: '#767272',
        wildSand: '#F6F6F6',
        backgroundPrimary: '#E5E5E533',
        separatorColor: '#F0EFEF',
        switchOn: '#32D74B',
        switchOff: '#BEBEC5',
        red: '#CF0E0E',
        bottomTab: {
            camera: '#CDA570',
            titleColor: '#C9C9C9',
        },
        homeView: {
            title: '#232323',
            underLine: '#BE955D',
            inActiveText: '#D5D5D7',
            name: '#797878',
            no: '#007AFF',
            textProvince: '#BDBDBD',
        },
        accountView: {
            background: '#FAF9F8',
        },
        assessment: {
            colorSearch: 'rgba(118,118,128,0.12)',
            placeHolderSearch: 'rgba(60,60,67,0.6)',
            takePicture: '#222222',
            titlePicture: '#333333',
            buttonPicture: '#F5F5F5',
            take: '#B2B2B2',
            logoInside: '#797878',
            backgroundModal: '#323030',
            buttonConfirm: '#B99059',
            borderMethod: '#DFDBD5',
            borderMethodActive: '#CDA570',
            nameMethod: '#BFBBB6',
            bgInput: 'rgba(0,0,0,0.3)',
            colorModalTrans: 'rgba(255,255,255,0.9)',
            leaveRoom: '#CF0E0E',
            user: '#A7A0A0',
            progress: '#EFECE6',
            progressActive: '#CDA570',
            confirm: {
                line: '#CFCDCD',
                camera: '#ECC898',
                take: '#222222',
                colorTaking: 'rgba(32, 31, 31, 0.7)',
                image: '#807B7B',
            },
            textNoteColor: '#757575',
            confirmTransfer: {
                separatorColor: '#F0EFEF',
                titleBlockConfirm: '#605B54',
            },
            textThank: '#939292',
            chat: {
                viewMessage: '#EBE9E9',
                input: '#F0F0F0',
            },
            iconClose: '#D7AF7B',
        },
        tutorialView: {
            textBtnAge: '#007AFF',
        },
        profile: {
            inputBorder: '#D6D0D0',
            textError: '#CF0E0E',
        },
        videoCallView: {
            endVideo: '#FF5045',
            textOffer: '#74716D',
            noteOffer: '#FE3030',
        },
        notification: {
            background: '#F0E9C0',
            link: '#2980b9',
        },
        imageLoading: '#d7d9db',
        modalShipBg: 'rgba(0,0,0,0.3)',
        backgroundTakePhotoCard: '#F5F5F5',
    },
    FONTS: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

const Dark = {
    colors: {
        ...common,
        primary: '#607d8b',
        secondary: '#607d8b',
        textPrimary: '#607d8b',
        textSecondary: '#607d8b',
    },
    fonts: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

export const Themes = Light;

export const ThemesDark = Dark;
