import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import useModal from 'components/base/modal/useModal';
import StyledHeaderEdit from 'components/common/StyledHeaderEdit';
import { ICON_CATEGORY, staticValue } from 'feature/staticData';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import ItemListCategoryView from '../components/ItemListCategoryView';

const EditCategoryView = ({ getCategory }: any) => {
    const { categories } = useSelector((state: any) => state.resource);
    const modal = useModal();
    return (
        <View style={styles.container}>
            <StyledHeaderEdit
                icon={Images.icons.close}
                title={'assessment.titleModalEdit'}
                onPress={() => modal.dismiss()}
            />
            {categories.map((item: any, index: number) => (
                <ItemListCategoryView
                    key={index}
                    title={item?.name}
                    iconLeft={ICON_CATEGORY[index].iconLeft}
                    iconRight={ICON_CATEGORY[index].iconRight}
                    onPress={() => {
                        modal.dismiss();
                        getCategory(item);
                    }}
                    customStyle={styles.itemList}
                    isBottom={index === categories.length - staticValue.DEFAULT_VALUE}
                />
            ))}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: Metrics.screenWidth,
        backgroundColor: Themes.COLORS.white,
        marginTop: '30@vs',
        borderTopLeftRadius: '15@s',
        borderTopRightRadius: '15@s',
    },
    item: {
        marginVertical: 10,
    },
    viewItem: {
        marginTop: 5,
    },
    itemList: {
        borderBottomColor: Themes.COLORS.gallery,
        marginLeft: 22,
    },
});
export default EditCategoryView;
