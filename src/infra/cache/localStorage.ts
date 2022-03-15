import { SetStorage, GetStorage } from '@/data/protocols/cache'

export const getStorage: GetStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const setStorage: SetStorage = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.removeItem(key)
  }
}