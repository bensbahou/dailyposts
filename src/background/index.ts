import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { usePromptsStore } from "~stores/usePromptsStore"

import { mainProcess } from "./mainProcess"

console.log("Background script from", chrome.runtime.getManifest().name)

export {}
listenForStorageChanges()
chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked")
  console.log(usePromptsStore.getState())
  mainProcess()
})

/* // Move alarm creation to chrome.runtime.onInstalled
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyAlarm", { periodInMinutes: 1440 })

  // Optional: Log to confirm alarm was created
  chrome.alarms.get("dailyAlarm").then((alarm) => {
    console.log(
      "Daily alarm created",
      new Date(alarm.scheduledTime).toLocaleString()
    )
  })
}) */

/* // Keep the alarm listener outside
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyAlarm") {
    console.log("Daily alarm triggered")
    mainProcess()
  }
}) */
