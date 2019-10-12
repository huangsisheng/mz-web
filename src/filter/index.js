import { changeDate } from "utils/formatDate"
import Vue from "vue";

const globalFilter = () => {
    Vue.filter('formatDate', function (value) {
        return changeDate(value)
    })
}

export default globalFilter
