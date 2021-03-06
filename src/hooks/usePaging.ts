/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

const SIZE_LIMIT = 10;
const usePaging = (
    requestPaging: (config: any, id?: number) => Promise<any>,
    initialParams?: any,
    id?: number,
    onSuccess?: (data?: any, cbParams?: any) => void,
    onError?: (error: Error, cbParams?: any) => void,
) => {
    const [pagingData, _setPagingData] = useState({
        refreshing: false,
        loadingMore: false,
        pageIndex: 1,
        list: [],
        noMore: false,
    });
    const setPagingData = (data: any) => {
        _setPagingData(data);
    };
    const [params, setParams] = useState<any>(initialParams);
    useEffect(() => {
        runRequest(pagingData.pageIndex, SIZE_LIMIT, params);
    }, [pagingData.pageIndex]);
    useEffect(() => {
        onRefresh();
    }, [params]);
    const handleOnSuccess = (data: any) => {
        const responseData = data || {};
        const newList: [] = responseData.data || [];
        if (pagingData.pageIndex === 1) {
            setPagingData({
                ...pagingData,
                list: newList,
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        } else if (newList.length > 0) {
            setPagingData({
                ...pagingData,
                list: [...pagingData.list, ...newList],
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        }
    };
    // config request paging
    const runRequest = async (requestPageIndex: number, take?: number, otherParams?: any) => {
        const res = await requestPaging({
            params: {
                pageIndex: requestPageIndex,
                take: take || SIZE_LIMIT,
                ...otherParams,
            },
            id,
        });
        handleOnSuccess(res);
    };
    const onRefresh = () => {
        if (pagingData.pageIndex > 1) {
            setPagingData({ ...pagingData, refreshing: true, pageIndex: 1 });
        } else {
            runRequest(1, SIZE_LIMIT, params);
        }
    };
    const onLoadMore = () => {
        if (!pagingData.noMore) {
            setPagingData({
                ...pagingData,
                loadingMore: true,
                pageIndex: pagingData.pageIndex + 1,
            });
        }
    };
    return {
        pagingData,
        onRefresh,
        onLoadMore,
        params,
        setParams,
        _setPagingData,
    };
};
export default usePaging;
