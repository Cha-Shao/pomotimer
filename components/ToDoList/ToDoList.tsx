"use client"

import { toDoStore } from "@/stores/toDo"
import { useStore } from "@nanostores/react"
import {
  Reorder,
  motion,
} from "framer-motion"
import ToDoCard from "./ToDoCard"

const ToDoList = ({
  onMouseLeave,
  onMouseEnter,
  hoverIndex,
  solvedState,
}: {
  onMouseLeave: () => void
  onMouseEnter: (id: number) => void
  hoverIndex: number | null
  solvedState: boolean
}) => {
  const toDo = useStore(toDoStore)

  return (
    <motion.div
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.1 }}
      className="overflow-hidden"
      onMouseLeave={onMouseLeave}
    >
      <Reorder.Group
        as="ul"
        values={toDo.list}
        onReorder={newList => {
          toDoStore.set({
            ...toDoStore.get(),
            list: newList,
          })
          localStorage.setItem("to-do-list", JSON.stringify(newList))
        }}
      >
        {toDo.list.map(toDo => (
          <Reorder.Item
            key={toDo.id}
            id={toDo.id.toString()}
            value={toDo}
            className="relative"
          >
            {toDo.solved === solvedState && (
              <>
                <ToDoCard
                  {...toDo}
                  onMouseEnter={() => onMouseEnter(toDo.id)}
                />
                {toDo.id === hoverIndex && (
                  <motion.div
                    layoutId="to-do-list"
                    className="absolute top-0 h-full w-full pbg rounded-md"
                    transition={{ duration: 0.1 }}
                  />
                )}
              </>
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </motion.div>
  )
}

export default ToDoList
