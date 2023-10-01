import classNames from "classnames"
import { HTMLAttributes } from "react"

const Tooltip = (props: {
  label: string
  placement?: "top" | "bottom"
} & HTMLAttributes<HTMLDivElement>) => {
  const {
    placement = "top",
    ...attrs
  } = props

  return (
    <div className="relative group">
      <span className={classNames(
        "absolute",
        placement === "top" ? "bottom-full mb-1" : "top-full mt-1",
        "left-1/2 -translate-x-1/2",
        "duration-100 opacity-0 group-hover:opacity-100 pointer-events-none",
        "shadow-sm bg px-2 rounded-full w-max border border-border",
        "text-sm"
      )}>{props.label}</span>
      {attrs.children}
    </div>
  )
}

export default Tooltip
