// 多次使用到的接口
import http from "./http"

export const gateway = () => {
    return http.get('/gateway')
}

export const nowPlaying = () => {
    return http.get('/movie/nowPlaying')
}