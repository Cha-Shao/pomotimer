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
      const prevState = focusStore.get()
      if (prevState.seconds === 1) {
        focusController.finish()
        return
      }
      focusStore.set({
        ...prevState,
        seconds: prevState.seconds! - 1,
      })
    }, 1000)
    focusStore.set({
      round: 0,
      seconds,
      status: Status.Run,
      step: Step.Focus,
      focusId,
    })
    return focusId
  },
  finish: (type: "finish" | "cancel" = "finish") => {
    const prevState = focusStore.get()
    clearInterval(prevState.focusId!)
    focusStore.set({
      round: 0,
      seconds: null,
      status: Status.Stop,
      step: Step.Focus,
      focusId: null,
    })
    if (sendNotificationStore.get() && type === "finish")
      new Notification(
        "番茄钟", {
        body: notificationMessage[prevState.step],
        icon: "/icon.jpg",
      })
  },
  togglePause: () => {
    const prevState = focusStore.get()
    if (prevState.status === Status.Run) {
      clearInterval(prevState.focusId!)
      focusStore.set({
        ...prevState,
        status: Status.Pause,
        focusId: null,
      })
    } else {
      focusController.start(prevState.seconds!)
    }
  },
  skip: () => {

  },
}
