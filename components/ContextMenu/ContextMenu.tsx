import classNames from "classnames"
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import { contextMenuContext } from "./ContextMenuProvider"
import { motion } from "framer-motion"

export interface MenuProps {
  label: string
  icon?: string
  action?: () => void
  danger?: boolean

}

export interface ContextMenuProps {
  x: number,
  y: number
  menus: MenuProps[]
}

const ContextMenu = (props: ContextMenuProps) => {
  const { setContextMenu } = useContext(contextMenuContext)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback((e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node))
      setContextMenu(null)
  }, [setContextMenu])

  useEffect(() => {
    addEventListener("click", handleClick)
    return () => removeEventListener("click", handleClick)
  }, [handleClick])

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.5, transformOrigin: "0 0" }}
      animate={{ opacity: 1, scale: 1, transformOrigin: "0 0" }}
      exit={{ opacity: 0, scale: 0.5, transformOrigin: "0 0" }}
      transition={{ duration: 0.1 }}
      layout
      className="z-50 absolute p-2 bg border border-border rounded-lg shadow-sm"
      style={{
        left: props.x,
        top: props.y,
      }}
    >
      {props.menus.map((menu, i) => (
        <li
          key={i}
          onClick={() => {
            menu.action && menu.action()
            setContextMenu(null)
          }}
          className={classNames(
            "py-2 px-4   flex items-center gap-2 rounded-md",
            menu.danger ? "hover:bg-red-500 hover:text-white" : "hover:bg-lightBackground dark:hover:bg-darkBackground"
          )}
        >
          {menu.icon && <span className={classNames(menu.icon, "text-lg")} />}
          <span>{menu.label}</span>
        </li>
      ))}
    </motion.div>
  )
}

export default ContextMenu
