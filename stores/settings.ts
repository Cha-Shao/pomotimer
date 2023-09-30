import { Settings } from "@/types/settings"
import { atom } from "nanostores"

export const settingsStore = atom<Settings>({
  notification: false,
  hideTime: false,
})
