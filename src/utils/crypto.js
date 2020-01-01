import CryptoJS from 'crypto-js'//加密处理js
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params
    let result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]
            key = CryptoJS.enc.Latin1.parse(key)
            var iv = key
            var encrypted = CryptoJS.AES.encrypt(
                data,
                key,
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                }
            )
            result[ele] = encrypted.toString()
        })
    }
    return result
}