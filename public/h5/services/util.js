/**
 * Created by lvliqi on 2017/7/18.
 */
import response from './index'

export default {
    wxAddImage: (data) => (response('/h5/util/wx/add_image', data)),
    socketHost: (data) => (response('/h5/util/chat/get_host', data)),
}