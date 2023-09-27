"use client"

import Link from "next/link"
import {
  Fragment,
  useEffect,
} from "react"
import IconButton from "./IconButton"
import { sendNotificationStore } from "@/stores/notification"
import { useStore } from "@nanostores/react"

const Settings = () => {
  const sendNotification = useStore(sendNotificationStore)

  const toggleNotification = () => {
    if (!sendNotification) {
      if (Notification.permission !== "granted")
        Notification.requestPermission()
          .then(res => {
            if (res === "granted") {
              sendNotificationStore.set(true)
              localStorage.setItem("notification", "true")
            }
          })
      else {
        sendNotificationStore.set(true)
        localStorage.setItem("notification", "true")
      }
    }
    else {
      sendNotificationStore.set(false)
      localStorage.removeItem("notification")
    }
  }

  useEffect(() => {
    sendNotificationStore.set(localStorage.getItem("notification") === "true")
  }, [])

  return (
    <Fragment>
      <Link href={"https://focuskit.vercel.app/"} target="_blank">
        <IconButton icon="icon-[ph--moon-bold]" />
      </Link>
      <IconButton
        icon={sendNotification
          ? "icon-[ph--bell-simple-bold]"
          : "icon-[ph--bell-simple-slash-bold]"}
        onClick={toggleNotification}
      />
      <Link href={"https://github.com/Cha-Shao/target"} target="_blank">
        <IconButton icon="icon-[ph--github-logo-bold]" />
      </Link>
    </Fragment>
  )
}

export default Settings
