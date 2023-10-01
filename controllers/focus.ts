import { focusStore } from "@/stores/focus"
import { Status, Step } from "@/types/focus"
import recordController from "./record"
import { settingsStore } from "@/stores/settings"

const notificationMessage = [
  "专注时间已结束，休息一下吧！",
  "休息时间已结束，加油！",
]

const focusController = {
  start: (seconds?: number) => {
    const focusId = setInterval(() => {
      const prevFocusData = focusStore.get()
      if (prevFocusData.seconds === 1) {
        focusController.finish()
        return
      }
      focusStore.set({
        ...prevFocusData,
        seconds: prevFocusData.seconds! - 1,
      })
      // 休息时间不计入专注时间
      if (prevFocusData.step === Step.Focus)
        recordController.append()
    }, 1000)
    focusStore.set({
      ...focusStore.get(),
      seconds: seconds
        ? seconds
        : focusStore.get().step === Step.Focus
          ? 25 * 60
          : 5 * 60,
      status: Status.Run,
      focusId,
    })
  },
  finish: () => {
    const prevFocusData = focusStore.get()
    clearInterval(prevFocusData.focusId!)
    if (settingsStore.get().notification)
      new Notification(
        "番茄钟", {
        body: notificationMessage[prevFocusData.step],
        icon: "/icon.jpg",
      })
    focusStore.set({
      pauseTime: 0,
      seconds: null,
      status: Status.Stop,
      step: prevFocusData.step === Step.Focus
        ? Step.Break
        : Step.Focus,
      focusId: null,
    })
  },
  cancel: () => {
    const prevFocusData = focusStore.get()
    focusStore.set({
      ...prevFocusData,
      pauseTime: 0,
      seconds: null,
      status: Status.Stop,
      focusId: null,
    })
  },
  togglePause: () => {
    const prevFocusData = focusStore.get()
    if (prevFocusData.status === Status.Run) {
      clearInterval(prevFocusData.focusId!)
      focusStore.set({
        ...prevFocusData,
        pauseTime: prevFocusData.pauseTime + 1,
        status: Status.Pause,
        focusId: null,
      })
    } else {
      focusController.start(prevFocusData.seconds!)
    }
  },
}

export default focusController
