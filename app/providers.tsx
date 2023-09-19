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
import { ToDo } from "@/types/toDoList"

export const contextMenuContext = createContext<{
  contextMenu: ContextMenuProps | null,
  setContextMenu: Dispatch<SetStateAction<ContextMenuProps | null>>
}>({
  contextMenu: null,
  setContextMenu: () => { },
})
export const currentToDoContext = createContext<{
  currentToDo: ToDo | null,
  setCurrentToDo: Dispatch<SetStateAction<ToDo | null>>
}>({
  currentToDo: null,
  setCurrentToDo: () => { },
})

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuProps | null>(null)
  const [currentToDo, setCurrentToDo] = useState<ToDo | null>(null)

  return (
    <contextMenuContext.Provider value={{ contextMenu, setContextMenu }}>
      <currentToDoContext.Provider value={{ currentToDo, setCurrentToDo }}>
        {children}
        <AnimatePresence>
          {contextMenu && <ContextMenu {...contextMenu} />}
        </AnimatePresence>
      </currentToDoContext.Provider>
    </contextMenuContext.Provider>
  )
}

export default Providers
