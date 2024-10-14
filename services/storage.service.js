export const localStorageService = {
    loadFromStorage,
    saveToStorage
}

export function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

export function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}