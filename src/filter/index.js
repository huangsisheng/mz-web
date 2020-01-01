import { changeDate } from "utils/formatDate"
import Vue from "vue";

const globalFilter = () => {
    // 时间戳格式转化
    Vue.filter('formatDate', function (value) {
        return changeDate(value)
    })

    // 模糊手机号码
    Vue.filter('dimUsername',function (value) {
        let str = String(value)
        const username = str.replace(str.substring(3, 7), '****')
        return username
    })
}

export default globalFilter
