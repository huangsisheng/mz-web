/***************** 判断浏览器环境 ****************** */

function sUserAgent() {
    return navigator.userAgent.toLowerCase()
}

// 微信环境
export const isWeiChat = function () {
    return sUserAgent().indexOf('micromessenger') > -1
}

// android还是ios环境
export const IosOrAndroid = function () {
    // 检索字符串
    var bIsIpad = sUserAgent().match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent().match(/iphone os/i) == "iphone os";
    var bIsAndroid = sUserAgent().match(/android/i) == "android";
    if (bIsIphoneOs || bIsIpad) {
        return true
    } else if (bIsAndroid) {
        return false
    }
}

// 调用android/ios的方法
export const device = function() {
    if (IosOrAndroid()) {
        try {
            // window.alert('我是ios')
            // 其中 callNativeApp 是 iOS 客户端注册的一个 handler 名称, 可以你这边定.
            // iOS 端根据实际的 handler 名称在原生代码中注册 handler 即可.
            // let token = webkit.messageHandlers.callNativeCode.postMessage("2a2b881b-a1ee-11e8-b13b-00163e06f780")
        } catch (error) {
            console.error('The native context not exist ')
        }
    } else if (!IosOrAndroid()) {
        // let token = window.android.CloseWeb();
        // window.android.handlePics();
    }
}
