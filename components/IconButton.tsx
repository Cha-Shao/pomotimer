"use client"

import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

const IconButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={classNames(
        props.className,
        "w-8 h-8",
        "border border-border",
        "flex justify-center items-center",
        "hover:bg-border/10 duration-100",
        "rounded-md duration-100",
      )}
    >
    </button>
  )
}

export default IconButton
