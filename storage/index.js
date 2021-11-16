
/**
 * 使用须知
 * 需在顶层引入此文件，达到全面覆盖
 * import { storageDispathInit } from 'storage/index'
 * 一起初始化 storageDispathInit()
 * 单独初始化 storageDispath.dispatchLocalStorage()
 * 
 */
import {
  // localStorage
  LOCAL_STORAGE_WHITE_LIST, 
  ERROR_LOCAL_STORAGE_MESSAGE,
  // sessionStorage
  SESSION_STORAGE_WHITE_LIST,
  ERROR_SESSION_STORAGE_MESSAGE
} from 'storage/list/index'

export const storageDispath = {
  dispatchLocalStorage() {
    const temp = localStorage.setItem
    localStorage.setItem = function (key, val) {
      if(!LOCAL_STORAGE_WHITE_LIST.includes(key)) {
        throw new Error(ERROR_LOCAL_STORAGE_MESSAGE)
      }
      temp.call(localStorage, key, val)
    }
  },
  dispatchSessionStorage() {
    const temp = sessionStorage.setItem
    sessionStorage.setItem = function (key, val) {
      if(!SESSION_STORAGE_WHITE_LIST.includes(key)) {
        throw new Error(ERROR_SESSION_STORAGE_MESSAGE)
      }
      temp.call(sessionStorage, key, val)
    }
  }
}

export const storageDispathInit = function () {
  try {
    storageDispath.dispatchLocalStorage()
    storageDispath.dispatchSessionStorage()
  } catch (err) {
    throw new Error(err)
  }
}

