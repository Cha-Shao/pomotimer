import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
} from "react"
import classNames from "classnames"

const Card = forwardRef((
  props: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      {...props}
      title={undefined}
      className={classNames(
        props.className,
        "p-6 border border-border rounded-2xl bg shadow-sm",
      )}
    >
      {props.title && <h3 className="font-bold mb-4">{props.title}</h3>}
      {props.children}
    </div>
  )
})

Card.displayName = "Card"

export default Card
