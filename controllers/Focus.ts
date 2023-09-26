import { focusStore } from "@/stores/focus"
import { sendNotificationStore } from "@/stores/notification"
import { Status, Step } from "@/types/focus"

const notificationMessage = [
  "专注时间已结束，休息一下吧！",
  "休息时间已结束，加油！",
]

export const focusController = {
  start: (seconds: number = 25 * 60) => {
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
    }, 1000)
    focusStore.set({
      ...focusStore.get(),
      seconds,
      status: Status.Run,
      focusId,
    })
    return focusId
  },
  finish: () => {
    const prevFocusData = focusStore.get()
    clearInterval(prevFocusData.focusId!)
    new Notification(
      "番茄钟", {
      body: notificationMessage[prevFocusData.step],
      icon: "/icon.jpg",
    })
    focusStore.set({
      ...prevFocusData,
      pauseTime: 0,
      seconds: null,
      status: Status.Stop,
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
  skip: () => {

  },
}
