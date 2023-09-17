import { HTMLAttributes } from "react"
import classNames from "classnames"

const Card = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        "p-6 border border-border rounded-2xl bg shadow-sm",
      )}
    >
      {props.title && <h3 className="font-bold mb-4">{props.title}</h3>}
      {props.children}
    </div>
  )
}

export default Card
