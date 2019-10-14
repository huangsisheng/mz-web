// 本地存储配置
const storage = window.localStorage

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    storage.setItem(key, value)
}

function get(key) {
    const value = storage.getItem(key) || ''

    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }
}

function remove(key) {
    storage.removeItem(key)
}

function clear() {
    storage.clear()
}

export default {
    set,
    get,
    remove,
    clear
}
