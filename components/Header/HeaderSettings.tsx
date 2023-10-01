"use client"

import {
  Fragment,
  useEffect,
} from "react"
import { useStore } from "@nanostores/react"
import { settingsStore } from "@/stores/settings"
import settingsController from "@/controllers/settings"
import IconButton from "../IconButton"
import Tooltip from "../Tooltip"

const Settings = () => {
  const settings = useStore(settingsStore)

  useEffect(() => {
    settingsController.init()
  }, [])

  return (
    <Fragment>
      <Tooltip label="夜间模式" placement="bottom">
        <IconButton
          icon="icon-[ph--moon-bold]"
          onClick={() => window.open("https://focuskit.vercel.app/")}
        />
      </Tooltip>
      <Tooltip label="隐藏时间" placement="bottom">
        <IconButton
          icon={settings.hideTime
            ? "icon-[ph--hourglass-bold]"
            : "icon-[ph--timer-bold]"}
          onClick={settingsController.hideTime}
        />
      </Tooltip>
      <Tooltip label="通知" placement="bottom">
        <IconButton
          icon={settings.notification
            ? "icon-[ph--bell-simple-bold]"
            : "icon-[ph--bell-simple-slash-bold]"}
          onClick={settingsController.notification}
        />
      </Tooltip>
      <Tooltip label="源代码" placement="bottom">
        <IconButton
          icon="icon-[ph--github-logo-bold]"
          onClick={() => window.open("https://github.com/Cha-Shao/target/")}
        />
      </Tooltip>
    </Fragment>
  )
}

export default Settings
