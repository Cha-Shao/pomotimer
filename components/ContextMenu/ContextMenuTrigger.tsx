"use client"

import {
  MouseEventHandler,
  ReactElement,
  cloneElement,
  useContext,
} from "react"
import { MenuProps } from "./ContextMenu"
import { contextMenuContext } from "./ContextMenuProvider"

export interface ContextMenuProps {
  x: number,
  y: number
  menus: {
    label: string
    icon?: string
    action?: () => void
    danger?: boolean
  }[]
}

const ContextMenuTrigger = (
  props: {
    children: ReactElement
    menus: MenuProps[]
  }
) => {
  const { setContextMenu } = useContext(contextMenuContext)

  const handleContextMenu = (e: MouseEventHandler<HTMLElement>) => {
    // @ts-ignore
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      menus: props.menus,
    })
  }

  return (
    <>
      {cloneElement<HTMLElement>(props.children, {
        ...props.children.props,
        onContextMenu: handleContextMenu,
      })}
    </>
  )
}

export default ContextMenuTrigger
