import classNames from "classnames"
import { HTMLAttributes } from "react"

interface Props {
  maxTime: number
  currentTime: number
}

const levelColor = [
  "border-primary/30 bg-primary/20",
  "border-primary/70 bg-primary/50",
  "border-primary bg-primary brightness-110",
  "border-primary bg-primary brightness-90",
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
        "w-4 h-4 rounded-sm border",
        currentTime === 0
          ? "border-border bg-border/10"
          : levelColor[focusLevel],
        attrs.className
      )}
    />
  )
}

export default FocusBlock
