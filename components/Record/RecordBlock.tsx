import classNames from "classnames"
import { HTMLAttributes } from "react"
import dayjs from "dayjs"
import Tooltip from "../Tooltip"

interface Props {
  date: number
  maxTime: number
  currentTime: number
  noHover?: boolean
}

const levelColor = [
  "border-primary/30 bg-primary/20",
  "border-primary/70 bg-primary/50",
  "border-primary bg-primary",
  "border-[#c23a33] bg-[#c23a33]",
]

const FocusBlock = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const {
    date,
    maxTime,
    currentTime,
    noHover,
    ...attrs
  } = props

  const getFocusLevel = () => {
    switch (true) {
      case (currentTime < maxTime * (1 / 4)):
        return 0
      case (currentTime < maxTime * (1 / 2)):
        return 1
      case (currentTime < maxTime * (3 / 4)):
        return 2
      default:
        return 3
    }
  }
  const focusLevel = getFocusLevel()

  return !noHover ? (
    <Tooltip label={`${dayjs(date).format("MM月DD日")} ${currentTime > 0
      ? `${Math.floor(currentTime / (60 * 60))}小时${Math.floor(currentTime % (60 * 60) / 60)}分钟`
      : "无专注活动"}`}>
      <div
        {...attrs}
        className={classNames(
          "h-4 w-4",
          "rounded-sm border",
          "duration-200",
          currentTime === 0
            ? "border-border bg-border/10"
            : levelColor[focusLevel],
          attrs.className
        )} />
    </Tooltip>
  ) : (
    <div
      {...attrs}
      className={classNames(
        "h-4 w-4",
        "rounded-sm border",
        "duration-200",
        currentTime === 0
          ? "border-border bg-border/10"
          : levelColor[focusLevel],
        attrs.className
      )} />
  )
}

export default FocusBlock
