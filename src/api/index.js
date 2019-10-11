// 多次使用到的接口
import http from "./http"

export const gateway = () => {
    return http.get('/gateway')
}

export const nowPlaying = () => {
    return http.get('/movie/nowPlaying')
}
export const comingSoon = () => {
    return http.get('/movie/comingSoon')
}
export const filmsDetails = () => {
    return http.get('/movie/filmsDetails')
}