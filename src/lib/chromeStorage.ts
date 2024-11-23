export const chromeStorage = {
  getItem: (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([name], (result) => {
        resolve(result[name] || null)
      })
    })
  },
  setItem: (name: string, value: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      chrome.storage.local.set({ [name]: value }, () => {
        resolve()
      })
    })
  },
  removeItem: (name: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      chrome.storage.local.remove(name, () => {
        resolve()
      })
    })
  }
}
