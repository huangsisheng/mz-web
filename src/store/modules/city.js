import { gateway } from "api"
const city = {
    state:{
        city:[],
        hotCity:[],
        allcitys:[]
    },
    actions:{
        async gateway(state){
            let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            let newArr = []
            let res = await gateway()
            if (res.status === 0){
                let data = res.data
                arr.forEach((curr) => {
                    let obj = {
                        initial:'',
                        citys:[]
                    }
                    data.cities.forEach((item) => {
                        if (curr === item.pinyin.slice(0, 1).toUpperCase()){
                            obj.initial = curr
                            obj.citys.push(item)
                        }
                    })
                    newArr.push(obj)
                })
                data.cities.forEach((item) => {
                    if (item.isHot === 1) {
                        state.state.hotCity.push(item)
                    }
                })
                state.state.city = newArr
                state.state.allcitys = data.cities
            }
        }
    }
}

export default city