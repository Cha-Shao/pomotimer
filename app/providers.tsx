"use client"

import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react"
import ContextMenu, {
  ContextMenuProps,
} from "../components/ContextMenu/ContextMenu"
import { AnimatePresence } from "framer-motion"

export const contextMenuContext = createContext<{
  contextMenu: ContextMenuProps | null,
  setContextMenu: Dispatch<SetStateAction<ContextMenuProps | null>>
}>({
  contextMenu: null,
  setContextMenu: () => { },
})

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuProps | null>(null)

  return (
    <contextMenuContext.Provider value={{ contextMenu, setContextMenu }}>
      {children}
      <AnimatePresence>
        {contextMenu && <ContextMenu {...contextMenu} />}
      </AnimatePresence>
    </contextMenuContext.Provider>
  )
}

export default Providers
