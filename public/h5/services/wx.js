/**
 * Created by lvliqi on 2017/7/13.
 */
import Q from 'q'

let selectImage = () => {
    let defer = Q.defer();

    wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            defer.resolve(localIds);
        }
    });

    return defer.promise;
};

let uploadImage = (localId) => {
    let defer = Q.defer();

    wx.uploadImage({
        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            let serverId = res.serverId; // 返回图片的服务器端ID
            defer.resolve(serverId);
        }
    });

    return defer.promise;
};

let previewImage = ({current, urls}) => {
    wx.previewImage({
        current: current,
        urls: urls
    });
};

export default {
    selectImage, uploadImage, previewImage
}