import { settingsStore } from "@/stores/settings"
import { Settings } from "@/types/settings"

const settingsController = {
  init: () => {
    const settings: Settings = (() => {
      const _ = localStorage.getItem("settings")
      if (_) {
        try {
          return JSON.parse(_)
        } catch {
          localStorage.setItem("settings", JSON.stringify({
            notification: false,
            hideTime: false,
          } as Settings))
          return {
            notification: false,
            hideTime: false,
          } as Settings
        }
      }
      localStorage.setItem("settings", JSON.stringify({
        notification: false,
        hideTime: false,
      } as Settings))
      return {
        notification: false,
        hideTime: false,
      } as Settings
    })()
    settingsStore.set(settings)
  },
  notification: () => {
    const prevSettingsData = settingsStore.get()
    if (!prevSettingsData.notification) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission()
          .then(res => {
            if (res === "granted") {
              settingsStore.set({
                ...prevSettingsData,
                notification: true,
              })
              localStorage.setItem("settings", JSON.stringify({
                ...prevSettingsData,
                notification: true,
              } as Settings))
            }
          })
      } else {
        settingsStore.set({
          ...prevSettingsData,
          notification: true,
        })
        localStorage.setItem("settings", JSON.stringify({
          ...prevSettingsData,
          notification: true,
        } as Settings))
      }
    } else {
      settingsStore.set({
        ...prevSettingsData,
        notification: false,
      })
      localStorage.setItem("settings", JSON.stringify({
        ...prevSettingsData,
        notification: false,
      } as Settings))
    }
  },
  hideTime: () => {
    const prevSettingsData = settingsStore.get()
    settingsStore.set({
      ...prevSettingsData,
      hideTime: !prevSettingsData.hideTime,
    })
    localStorage.setItem("settings", JSON.stringify({
      ...prevSettingsData,
      hideTime: !prevSettingsData.hideTime,
    } as Settings))
  },
}

export default settingsController
