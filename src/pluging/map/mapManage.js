export default class MapManage {
    constructor(props){
        this.map = this.createMap(props)
    }
    createMap(props){
        let { id } = props
        let map = new AMap.Map(id, {
            zoom: 10,  //设置地图显示的缩放级别
            viewMode: '2D',  //设置地图模式
            lang: 'zh_cn',  //设置地图语言类型
        })
        return map
    }
}