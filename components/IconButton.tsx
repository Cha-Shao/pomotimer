"use client"

import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

const IconButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: string
  }
) => {
  const {
    icon,
    ...attrs
  } = props

  return (
    <button
      {...attrs}
      className={classNames(
        props.className,
        "w-8 h-8",
        "border border-border",
        "flex justify-center items-center",
        "hover:bg-border/10 duration-100",
        "rounded-md duration-100",
        "group"
      )}
    >
      <span className={classNames(
        icon,
        "text-lg group-active:scale-50 duration-100"
      )} />
    </button>
  )
}

export default IconButton
