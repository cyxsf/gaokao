/**
 * 存储localstorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localstorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 利用 document.title 做新消息提示
 * @export
 * @param {Number} count
 */
export function titleNotify (count) {
  const hasNewMessage = count > 0
  if (hasNewMessage) {
    if (document.title.search(/\((.*?)\)/) >= 0) {
      document.title = document.title.replace(/\((.*?)\)/, `(${count > 99 ? '99+' : count})`)
    } else {
      document.title = `(${count})${document.title}`
    }
  } else {
    document.title = document.title.replace(/\((.*?)\)/, '')
  }
}
