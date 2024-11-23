import { useBearStore } from "~stores/useBearStore"

export const listenForStorageChanges = () => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("changes", changes, "namespace", namespace)
    if (namespace === "local") {
      if (changes.useBearStore) {
        console.log("Bear store changed!")
        useBearStore.setState(changes.useBearStore.newValue.state)
      }
    }
  })
}
