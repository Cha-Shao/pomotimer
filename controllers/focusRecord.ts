import { focusRecordStore } from "@/stores/focusRecord"
import dayjs from "dayjs"

const focusRecordController = {
  init: (): number => {
    const rawFocusRecord = localStorage.getItem("focus-record")
    if (rawFocusRecord) {
      try {
        let focusData: FocusRecord = JSON.parse(rawFocusRecord)
        // 计算如果很多天没专注
        const intervalDays = dayjs()
          .startOf("day")
          .diff(
            dayjs(focusData.lastUpdate).startOf("day"),
            "day"
          )
        console.log(intervalDays)
        const newFocusTime = focusData.focusTime
          .slice(intervalDays)
          .concat(Array(intervalDays).fill(0))
        focusData = {
          focusTime: newFocusTime,
          lastUpdate: new Date().toISOString(),
        }
        focusRecordStore.set(focusData)
        localStorage.setItem("focus-record", JSON.stringify(focusData))
        let maxTime = 0
        for (const time of focusData.focusTime) {
          maxTime = Math.max(maxTime, time)
        }
        return maxTime
      } catch {
        localStorage.setItem("focus-record", JSON.stringify({
          focusTime: Array(30).fill(0),
          lastUpdate: new Date().toISOString(),
        } as FocusRecord))
        return 0
      }
    } else {
      localStorage.setItem("focus-record", JSON.stringify({
        focusTime: Array(30).fill(0),
        lastUpdate: new Date().toISOString(),
      } as FocusRecord))
      return 0
    }
  },
  append: () => {
    const prevFocusRecordData = focusRecordStore.get()
    focusRecordStore.set({
      focusTime: [
        ...prevFocusRecordData.focusTime.slice(0, 29),
        prevFocusRecordData.focusTime[29] + 1,
      ],
      lastUpdate: new Date().toISOString(),
    })
    localStorage.setItem("focus-record", JSON.stringify(prevFocusRecordData))
  },
}

export default focusRecordController
