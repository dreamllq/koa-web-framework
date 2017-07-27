/**
 * Created by lvliqi on 2017/7/7.
 */

import {Toast, Modal} from 'antd-mobile'

window.alert = str => Toast.info(str, 2);
window.confirm = function (str, onOK, onCancel) {
    Modal.alert('提示', str, [
        {
            text: '取消',
            onPress: () => {
                onCancel && onCancel()
            }, style: 'default'
        },
        {
            text: '确定',
            onPress: () => {
                onOK && onOK();
            }, style: {fontWeight: 'bold'}
        },
    ])
};