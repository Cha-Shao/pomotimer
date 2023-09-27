import { atom } from "nanostores"

export const focusRecordStore = atom<FocusRecord>({
  focusTime: Array(30).fill(0),
  lastUpdate: new Date().toISOString(),
})
