class LocalStorageHelper {
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value) )
    //   
    } catch (e) {
      // 处理可能的异常，例如空间不足
      console.error('Error setting item in localStorage:', e)
    }
  }

  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  clear(key) {
    this.setItem(key,null)
  }
}
export default LocalStorageHelper
