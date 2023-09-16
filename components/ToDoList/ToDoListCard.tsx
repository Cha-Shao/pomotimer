"use client"

import {
  Fragment,
  useEffect,
  useState,
} from "react"
import Card from "../Card"
import { ToDo } from "@/types/toDoList"
import ToDoCard from "./ToDoCard"
import {
  AnimatePresence,
  Reorder,
  motion,
  useCycle,
} from "framer-motion"
import classNames from "classnames"
import confetti from "canvas-confetti"

const ToDoListCard = () => {
  const [hoverItem, setHoverItem] = useState<number | null>(null)
  const [inputToDo, setInputToDo] = useState("")
  const [toDoList, setToDoList] = useState<ToDo[] | null>(null)
  const [expanded, toggleExpanded] = useCycle(false, true)

  const handleAdd = () => {
    const thisList = {
      id: new Date().getTime(),
      content: inputToDo,
      solved: false,
    }
    const newToDoList = [...toDoList || [], thisList]
    setToDoList(newToDoList)
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
    setInputToDo("")
  }
  const handleSolve = (id: number) => {
    const newToDoList = toDoList!.map(toDo => {
      if (toDo.id === id) {
        if (!toDo.solved) {
          confetti({
            origin: { x: 0 },
            angle: 60,
          })
          confetti({
            origin: { x: 1 },
            angle: 120,
          })
        }
        return {
          ...toDo,
          solved: !toDo.solved,
        }
      }
      return toDo
    })
    setToDoList(newToDoList)
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
  }
  const handleDelete = (id: number) => {
    const newToDoList = toDoList!.filter(toDo => toDo.id !== id)
    setToDoList(newToDoList)
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
  }

  useEffect(() => {
    const toDoListInLocalStorage = localStorage.getItem("to-do-list")
    if (toDoListInLocalStorage) {
      try {
        setToDoList(JSON.parse(toDoListInLocalStorage))
      } catch {
        localStorage.setItem("to-do-list", "[]")
        setToDoList([])
      }
    } else {
      localStorage.setItem("to-do-list", "[]")
      setToDoList([])
    }
  }, [])

  return (
    <Card>
      <h3 className="mb-4">任务</h3>
      <div>
        <div className="flex items-center pbg border-2 border-border/10 focus-within:border-primary duration-100 rounded-lg">
          <input
            type="text"
            placeholder="添加任务，然后按下「回车」"
            className="grow bg-transparent min-h-[2rem] outline-none px-2"
            value={inputToDo}
            onChange={e => setInputToDo(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && inputToDo) handleAdd()
            }}
          />
          <div className="border border-border rounded-md p-1 grid place-items-center bg mr-1">
            <span className="icon-[ph--arrow-elbow-down-left]" />
          </div>
        </div>
        {toDoList ? (
          toDoList.length > 0 ? (
            <Fragment>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="my-4"
                onMouseLeave={() => setHoverItem(null)}
              >
                <Reorder.Group
                  as="ul"
                  values={toDoList}
                  onReorder={newList => {
                    setToDoList(newList)
                    localStorage.setItem("to-do-list", JSON.stringify(newList))
                  }}
                >
                  {toDoList.map(toDo => (
                    <Reorder.Item
                      key={toDo.id}
                      id={toDo.id.toString()}
                      value={toDo}
                      className="relative"
                    >
                      {!toDo.solved && (
                        <Fragment>
                          <ToDoCard
                            {...toDo}
                            onMouseEnter={() => setHoverItem(toDo.id)}
                            onSolve={() => handleSolve(toDo.id)}
                            onDelete={() => handleDelete(toDo.id)}
                          />
                          {toDo.id === hoverItem && (
                            <motion.div
                              layoutId="to-do-list"
                              className="absolute top-0 h-full w-full pbg rounded-md"
                              transition={{ duration: 0.1 }}
                            />
                          )}
                        </Fragment>
                      )}
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </motion.div>
              <button
                className="mx-auto pbg px-2 text-sm rounded-full flex items-center gap-1"
                onClick={() => toggleExpanded()}
              >
                <span>已完成任务</span>
                <span className={classNames(
                  "icon-[ph--triangle-fill] text-xs",
                  expanded && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {(expanded && toDoList.filter(toDo => toDo.solved).length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Reorder.Group
                      as="ul"
                      values={toDoList}
                      onReorder={newList => {
                        setToDoList(newList)
                        localStorage.setItem("to-do-list", JSON.stringify(newList))
                      }}
                    >
                      {toDoList.map(toDo => (
                        <Reorder.Item
                          key={toDo.id}
                          id={toDo.id.toString()}
                          value={toDo}
                          className="relative"
                        >
                          {toDo.solved && (
                            <Fragment>
                              <ToDoCard
                                {...toDo}
                                onMouseEnter={() => setHoverItem(toDo.id)}
                                onSolve={() => handleSolve(toDo.id)}
                                onDelete={() => handleDelete(toDo.id)}
                              />
                              {toDo.id === hoverItem && (
                                <motion.div
                                  layoutId="to-do-list"
                                  className="absolute top-0 h-full w-full pbg rounded-md"
                                  transition={{ duration: 0.1 }}
                                />
                              )}
                            </Fragment>
                          )}
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          ) : (
            <div className="text-center my-4 py-4">
              <p>没有任务了</p>
              <p className="opacity-50 text-sm">在上方添加新的任务</p>
            </div>
          )
        ) : (
          <div className="my-4 py-8 grid place-items-center">
            <span className="icon-[ph--circle-notch-bold] animate-spin text-primary" />
          </div>
        )}
      </div>
    </Card >
  )
}

export default ToDoListCard
