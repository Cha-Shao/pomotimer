import classNames from "classnames"
import { HTMLAttributes } from "react"
import dayjs from "dayjs"

interface Props {
  maxTime: number
  currentTime: number
}

const levelColor = [
  "border-primary/30 bg-primary/20",
  "border-primary/70 bg-primary/50",
  "border-primary bg-primary",
  "border-[#cf3d36] bg-[#cf3d36]",
]

const FocusBlock = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const {
    maxTime,
    currentTime,
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

  return (
    <div
      {...attrs}
      className={classNames(
        "relative group",
        "w-4 h-4 rounded-sm border",
        currentTime === 0
          ? "border-border bg-border/10"
          : levelColor[focusLevel],
        attrs.className
      )}
    >
      <span className={classNames(
        "opacity-0 group-hover:opacity-100 duration-100",
        "absolute bottom-5 left-1/2 -translate-x-1/2",
        "bg rounded-full border border-border/10 shadow-sm",
        "pointer-events-none",
        "px-2 w-max z-10",
        "text-sm"
      )}>
        {currentTime > 0
          ? `${Math.floor(currentTime / 60)}小时${currentTime % 60}分钟`
          : "今日无专注"}
      </span>
    </div>
  )
}

export default FocusBlock
