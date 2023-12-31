"use client"

import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react"
import Card from "../Card"
import {
  AnimatePresence,
  motion,
  useCycle,
} from "framer-motion"
import classNames from "classnames"
import { ConfettiIcon } from "./ConfettiIcon"
import { EmptyIcon } from "./EmptyIcon"
import toDoController from "@/controllers/toDo"
import { toDoStore } from "@/stores/toDo"
import { useStore } from "@nanostores/react"
import ToDoList from "./ToDoList"

const MotionCard = motion(Card)

const ToDoListSection = () => {
  const toDo = useStore(toDoStore)
  // 视觉用
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | "auto">("auto")
  const [hoverItem, setHoverItem] = useState<number | null>(null)
  const [expanded, toggleExpanded] = useCycle(false, true)
  // 数据
  const [inputToDo, setInputToDo] = useState("")

  useEffect(() => {
    toDoController.init()
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

  return (
    <MotionCard
      id="to-do-list"
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
              if (e.key === "Enter" && inputToDo) {
                toDoController.add(inputToDo)
                setInputToDo("")
              }
            }}
          />
          <div className="border border-border rounded-md p-1 grid place-items-center bg mr-1">
            <span className="icon-[ph--arrow-elbow-down-left]" />
          </div>
        </div>
        {toDo.list ? (
          toDo.list.length !== 0 ? (
            <>
              {toDo.list.filter(toDo => !toDo.solved).length !== 0 ? (
                <ToDoList
                  onMouseEnter={(id) => setHoverItem(id)}
                  onMouseLeave={() => setHoverItem(null)}
                  hoverIndex={hoverItem}
                  solvedState={false}
                />
              ) : (
                <div className="text-center my-4 py-4">
                  <ConfettiIcon className="mx-auto mb-4" />
                  <p>全部任务已完成</p>
                  <p className="opacity-50 text-sm">在上方添加新的任务</p>
                </div>
              )}
              <motion.button
                layout
                className="mx-auto my-4 pbg px-2 text-sm rounded-full flex items-center gap-1"
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
                  <ToDoList
                    onMouseEnter={(id) => setHoverItem(id)}
                    onMouseLeave={() => setHoverItem(null)}
                    hoverIndex={hoverItem}
                    solvedState={true}
                  />
                )}
              </AnimatePresence>
            </>
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

export default ToDoListSection
