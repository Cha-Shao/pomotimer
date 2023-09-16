import { HTMLAttributes } from "react"
import classNames from "classnames"

const Card = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        "p-6 border border-border rounded-lg bg shadow-sm",
      )}
    />
  )
}

export default Card
