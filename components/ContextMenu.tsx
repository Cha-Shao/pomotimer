"use client"

import * as menu from "@zag-js/menu"
import {
  useMachine,
  normalizeProps,
} from "@zag-js/react"
import classNames from "classnames"
import { PropsWithChildren } from "react"
import { motion } from "framer-motion"

interface Menu {
  label: string
  action: () => void
  icon?: string
  danger?: boolean
}

export function ContextMenu(
  props: PropsWithChildren
    & {
      id: string
      menus: Menu[]
    }
) {
  const [state, send] = useMachine(
    menu.machine({
      id: props.id,
      "aria-label": "File",
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  return (
    <>
      <div {...api.contextTriggerProps}>
        {props.children}
      </div>
      <div {...api.positionerProps} className="z-50">
        {api.isOpen && (
          <motion.div
            initial={{ width: 0, height: 0 }}
            animate={{ width: "auto", height: "auto" }}
            className="overflow-hidden"
          >
            <ul {...api.contentProps} className="p-2 bg rounded-lg border border-border/10">
              {props.menus.map((menu, i) =>
                <li
                  key={i}
                  tabIndex={1}
                  {...api.getItemProps({ id: menu.label })}
                  className={classNames(
                    "rounded-md p-2",
                    menu.danger ? "hover:bg-red-500 hover:text-light" : "hover:bg-lightBackground dark:hover:bg-darkBackground"
                  )}
                  onClick={() => menu.action()}
                >
                  <span className="flex items-center flex-nowrap gap-2">
                    {menu.icon && <span className={classNames(menu.icon, "text-lg")} />}
                    <p className="whitespace-nowrap">{menu.label}</p>
                  </span>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </>
  )
}
