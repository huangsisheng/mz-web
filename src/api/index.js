// 多次使用到的接口
import http from "./http"

export const gateway = () => {
    return http.get('/gateway')
}

export const nowPlaying = () => {
    return http.get('/nowPlaying')
}
export const comingSoon = () => {
    return http.get('/comingSoon')
}
export const filmsDetails = () => {
    return http.get('/filmsDetails')
}

export const cinemas = () => {
    return http.get('/cinemas')
}
export const act = () => {
    return http.get('/act')
}
export const banner = () => {
    return http.get('/banner')
}

export const login = (params) => {
    return http.post('/api/login',params)
}
export const register = (params) => {
    return http.post('/api/register',params)
}
export const reset = (params) => {
    return http.post('/api/reset',params)
}
export const suggest = (params) => {
    return http.post('/api/suggest',params)
}