import { useBearStore } from "~stores/useBearStore"

export {}
setTimeout(() => {
  console.log("useBearStore", useBearStore.getState())
  //reset the store
  useBearStore.getState().reset()
}, 10000)
console.log(
  "Background script from",
  chrome.runtime.getManifest().name,
  chrome.runtime.getManifest()
)
