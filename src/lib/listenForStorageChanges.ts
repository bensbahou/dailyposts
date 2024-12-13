import { usePromptsStore } from "~stores/usePromptsStore"

export const listenForStorageChanges = () => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("changes", changes, "namespace", namespace)
    if (namespace === "local") {
      if (changes.usePromptsStore) {
        console.log("Prompts store changed!")
        usePromptsStore.setState(changes.usePromptsStore.newValue.state)
      }
    }
  })
}
