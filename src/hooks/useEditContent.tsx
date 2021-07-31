import useModal from 'components/base/modal/useModal';
import EditBrandView from 'feature/assessment/edit/EditBrandView';
import EditCategoryView from 'feature/assessment/edit/EditCategoryView';
import React, { useState } from 'react';

const useEditContent = () => {
    const [dataEditCategory, setDateEditCategory] = useState<any>(null);
    const [dataEditBrand, setDateEditBrand] = useState<any>(null);
    const modal = useModal();
    const dataCategory = (data: any) => {
        setDateEditCategory(data);
    };
    const dataBrand = (data: any) => {
        setDateEditBrand(data);
    };
    const showModalEditCategory = () => {
        modal.show({
            children: <EditCategoryView getCategory={dataCategory} />,
        });
    };

    const showModalEditBrand = (categoryId: number) => {
        modal.show({
            children: <EditBrandView categoryId={categoryId} getBrand={dataBrand} />,
        });
    };

    return { showModalEditCategory, dataEditCategory, showModalEditBrand, dataEditBrand };
};

export default useEditContent;
