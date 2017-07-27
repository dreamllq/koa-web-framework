/**
 * Created by lvliqi on 2017/7/13.
 */
import response from './index'

export default {
    jsapi: (data) => (response('/func/jsapi/config', data)),
}