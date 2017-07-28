/**
 * Created by lvliqi on 2017/7/22.
 */
import XcxApi from '../../service/third'

export default {
    namespace: 'submitAuditModal',
    state: {
        visible: false,
        title: '提交审核',
        confirmLoading: false,
        item: {},
        id: 0,
        record: {},
        bind: true,
        category: [],
        page: []
    },
    reducers: {
        payload(state, {payload}){
            return {...state, ...payload};
        }
    },
    effects: {
        *show({record}, {put}){
            let {appid} = record;
            let category = yield XcxApi.xcxGetCategory({appid});
            category = category.data.category_list;
            let page = yield XcxApi.xcxGetPage({appid});
            page = page.data.page_list;
            yield put({
                type: 'payload',
                payload: {
                    visible: true,
                    category,
                    page,
                    record,
                    item: {
                        category,
                        page
                    },
                    confirmLoading: false
                }
            })
        },
        *set({data}, {put, select}){
            yield put({type: 'payload', payload: {confirmLoading: true}});
            let {record, category, page} = yield select(state => state.submitAuditModal);
            let {appid} = record;
            let {item_list} = data;
            let result = item_list.map(d => {
                let {p, title, ca, tag} = d;
                return {
                    address: page[p],
                    tag,
                    ...category[ca],
                    title
                }
            });


            // let {remark} = data;
            // yield wechatApi.wechatUserSetRemark({remark, id});
            yield XcxApi.xcxSubmitAudit({
                appid,
                item_list: result
            });
            yield put({
                type: 'payload', payload: {
                    visible: false,
                    confirmLoading: false
                }
            });
            successAlert("操作成功");
            yield put({type: 'thirdXcxList/init'});
        }
    }
}