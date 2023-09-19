"use client"

import classNames from "classnames"
import Link from "next/link"
import {
  Fragment,
  useEffect,
  useState,
} from "react"

const settingButtonClassName = classNames(
  "w-8 h-8",
  "border border-border",
  "flex justify-center items-center",
  "hover:bg-primary hover:border-primary hover:text-light",
  "rounded-md duration-100",
)

const Settings = () => {
  const [receiveNotification, setReceiveNotification] = useState(false)

  const toggleNotification = () => {
    if (!receiveNotification) {
      if (Notification.permission !== "granted")
        Notification.requestPermission()
      else
        setReceiveNotification(true)
    }
    else
      setReceiveNotification(false)
  }

  const setupNotification = () => {
    const initialized = localStorage.getItem("initialized") === "true"
    if (!initialized) {
      setReceiveNotification(false)
      Notification.requestPermission()
    } else {
      const receiveNotification = localStorage.getItem("notification") === "true"
      setReceiveNotification(receiveNotification)
    }
  }

  useEffect(() => {
    setupNotification()
  }, [])

  return (
    <Fragment>
      <button onClick={() => { Notification.requestPermission() }}>qwq</button>
      <button className={settingButtonClassName} onClick={toggleNotification}>
        <span className={classNames(
          receiveNotification
            ? "icon-[ph--bell-simple-bold]"
            : "icon-[ph--bell-simple-slash-bold]",
          "text-lg"
        )} />
      </button>
      <Link href={"https://github.com/Cha-Shao/target"}>
        <button className={settingButtonClassName}>
          <span className="icon-[ph--github-logo-bold] text-lg" />
        </button>
      </Link>
    </Fragment>
  )
}

export default Settings
