"use client"

import { toDoStore } from "@/stores/toDo"
import { useStore } from "@nanostores/react"
import classNames from "classnames"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import IconButton from "../IconButton"
import { toDoController } from "@/controllers/toDo"

const FocusToDoCard = () => {
  const toDo = useStore(toDoStore)

  return (
    <AnimatePresence>
      {toDo.current && (
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className={classNames(
            "p-4 rounded-xl relative",
            "border border-primary/50 bg-primary/5",
            "flex justify-between items-end",
          )}>
            <div>
              <h2 className="mb-2 font-bold">专注中的事项</h2>
              <p>{toDo.current.content}</p>
            </div>
            <div className="flex gap-2">
              <IconButton onClick={() => toDoController.current(null)}>
                <span className="icon-[ph--trash-bold] text-lg" />
              </IconButton>
              <IconButton onClick={() => {
                // 这个不知道为啥说是null 上面不是&&了吗
                toDoController.solve(toDo.current!.id)
                toDoController.current(null)
              }}>
                <span className="icon-[ph--check-circle-bold] text-lg" />
              </IconButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FocusToDoCard
