"use client"

import classNames from "classnames"
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
      <IconButton onClick={toggleNotification} className="group">
        <span className={classNames(
          sendNotification
            ? "icon-[ph--bell-simple-bold] text-lg"
            : "icon-[ph--bell-simple-slash-bold] text-lg",
          "text-lg group-active:scale-50 duration-100"
        )} />
      </IconButton>
      <Link href={"https://github.com/Cha-Shao/target"}>
        <IconButton className="group">
          <span className="icon-[ph--github-logo-bold] text-lg group-active:scale-50 duration-100" />
        </IconButton>
      </Link>
    </Fragment>
  )
}

export default Settings
