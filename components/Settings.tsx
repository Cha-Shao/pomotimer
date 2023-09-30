"use client"

import {
  Fragment,
  useEffect,
} from "react"
import IconButton from "./IconButton"
import { useStore } from "@nanostores/react"
import { settingsStore } from "@/stores/settings"
import settingsController from "@/controllers/settings"

const Settings = () => {
  const settings = useStore(settingsStore)

  useEffect(() => {
    settingsController.init()
  }, [])

  return (
    <Fragment>
      <IconButton
        icon="icon-[ph--moon-bold]"
        onClick={() => window.open("https://focuskit.vercel.app/")}
      />
      <IconButton
        icon={settings.hideTime
          ? "icon-[ph--hourglass-bold]"
          : "icon-[ph--timer-bold]"}
        onClick={settingsController.hideTime}
      />
      <IconButton
        icon={settings.notification
          ? "icon-[ph--bell-simple-bold]"
          : "icon-[ph--bell-simple-slash-bold]"}
        onClick={settingsController.notification}
      />
      <IconButton
        icon="icon-[ph--github-logo-bold]"
        onClick={() => window.open("https://github.com/Cha-Shao/target/")}
      />
    </Fragment>
  )
}

export default Settings
