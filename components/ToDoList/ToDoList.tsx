"use client"

import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react"
import Card from "../Card"
import { ToDo } from "@/types/toDo"
import ToDoCard from "./ToDoCard"
import {
  AnimatePresence,
  Reorder,
  motion,
  useCycle,
} from "framer-motion"
import classNames from "classnames"
import { ConfettiIcon } from "./ConfettiIcon"
import { EmptyIcon } from "./EmptyIcon"
import {
  toDoController,
} from "@/controllers/toDo"
import { toDoStore } from "@/stores/toDo"
import { useStore } from "@nanostores/react"

const MotionCard = motion(Card)

const ToDoListCard = () => {
  const toDo = useStore(toDoStore)
  // 视觉用
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | "auto">("auto")
  const [hoverItem, setHoverItem] = useState<number | null>(null)
  const [expanded, toggleExpanded] = useCycle(false, true)
  // 数据
  const [inputToDo, setInputToDo] = useState("")
  const [toDoList, setToDoList] = useState<ToDo[] | null>(null)

  const handleAdd = () => {
    setToDoList(toDoController.add(inputToDo))
    setInputToDo("")
  }
  const handleSwitchSolve = (id: number) =>
    setToDoList(toDoController.solve(id))

  const handleSwitchImportant = (id: number) =>
    setToDoList(toDoController.important(id))

  const handleDelete = (id: number) =>
    setToDoList(toDoController.delete(id))

  // 初始化to do list
  useEffect(() => {
    const toDoListInLocalStorage = localStorage.getItem("to-do-list")
    if (toDoListInLocalStorage) {
      try {
        setToDoList(JSON.parse(toDoListInLocalStorage))
        toDoStore.set(JSON.parse(toDoListInLocalStorage))
      } catch {
        localStorage.setItem("to-do-list", "[]")
        setToDoList([])
      }
    } else {
      localStorage.setItem("to-do-list", "[]")
      setToDoList([])
    }
  }, [])

  // to do 完成时卡片高度的动画
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const observedHeight = entries[0].contentRect.height
      setHeight(observedHeight + 24 + 16 + 24 * 2)
    })
    resizeObserver.observe(containerRef.current!)

    return () => resizeObserver.disconnect()
  }, [])

  // 将 state 同步到 store，因为要协调framer-motion的Reorder
  useEffect(() => {
    toDoStore.set({
      ...toDoStore.get(),
      list: toDoList!,
    })
  }, [toDoList])

  return (
    <MotionCard
      title="任务列表"
      className="mb-4"
      animate={{ height }}
      transition={{ duration: 0.1 }}
    >
      <div ref={containerRef}>
        <div className="flex items-center pbg border-2 border-border/10 focus-within:border-primary duration-100 rounded-lg">
          <input
            type="text"
            placeholder="填写任务，然后按下「回车」"
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
        {toDo.list ? (
          toDo.list.length !== 0 ? (
            <Fragment>
              {toDo.list.filter(toDo => !toDo.solved).length !== 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="my-4"
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <Reorder.Group
                    as="ul"
                    values={toDo.list}
                    onReorder={newList => {
                      setToDoList(newList)
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
                        {!toDo.solved && (
                          <Fragment>
                            <ToDoCard
                              {...toDo}
                              onMouseEnter={() => setHoverItem(toDo.id)}
                              switchSolve={() => handleSwitchSolve(toDo.id)}
                              switchImportant={() => handleSwitchImportant(toDo.id)}
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
              ) : (
                <div className="text-center my-4 py-4">
                  <ConfettiIcon className="mx-auto mb-4" />
                  <p>全部任务已完成</p>
                  <p className="opacity-50 text-sm">在上方添加新的任务</p>
                </div>
              )}
              <motion.button
                layout
                className="mx-auto pbg px-2 text-sm rounded-full flex items-center gap-1"
                onClick={() => toggleExpanded()}
                transition={{ duration: 0.1 }}
              >
                <span>已完成任务</span>
                <span className={classNames(
                  "icon-[ph--triangle-fill] text-xs duration-300",
                  !expanded && "rotate-180"
                )} />
              </motion.button>
              <AnimatePresence>
                {(expanded && toDo.list.filter(toDo => toDo.solved).length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.1 }}
                    className="overflow-hidden"
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    <Reorder.Group
                      as="ul"
                      values={toDo.list}
                      onReorder={newList => {
                        setToDoList(newList)
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
                          {toDo.solved && (
                            <Fragment>
                              <ToDoCard
                                {...toDo}
                                onMouseEnter={() => setHoverItem(toDo.id)}
                                switchSolve={() => handleSwitchSolve(toDo.id)}
                                switchImportant={() => handleSwitchImportant(toDo.id)}
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
              <EmptyIcon className="mx-auto mb-4" />
              <p>这里没有任务</p>
              <p className="opacity-50 text-sm">在上方添加新的任务</p>
            </div>
          )
        ) : (
          <div className="my-4 py-8 grid place-items-center">
            <span className="icon-[ph--circle-notch-bold] animate-spin text-primary" />
          </div>
        )}
      </div>
    </MotionCard >
  )
}

export default ToDoListCard
