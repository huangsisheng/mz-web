import { Toast } from 'vant';
// 封装toast
// 加载框
export const showLoading = function (text) {
    if (text) {
        Toast.loading({
            mask: true,
            message: text
        })
    } else {
        Toast.clear()
    }
}

// 提示框
export const showToast = function (text) {
    return new Promise((resolve, reject) => {
        let timer = setTimeout(() => {
            Toast({
                message: text,
                duration: 1000
            })
            timer = null
            clearTimeout(timer)
        }, 0);
    })
}
