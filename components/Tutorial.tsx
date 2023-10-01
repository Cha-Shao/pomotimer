"use client"

import {
  useEffect,
  useState,
} from "react"
import { motion } from "framer-motion"
import Card from "./Card"
import classNames from "classnames"

const MotionCard = motion(Card)

const Tutorial = ({
  onFinish,
}: {
  onFinish: () => void
}) => {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [focusStepData, setFocusStepData] = useState<{ label: string, element: HTMLElement }[] | null>(null)
  const [focusingStep, setFocusingStep] = useState(0)

  const onResize = () => {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
  }

  const prevTip = () => {
    setFocusingStep(prevStep => {
      return prevStep - 1 < 0
        ? 0
        : prevStep - 1
    })
  }
  const nextTip = () => {
    setFocusingStep(prevStep => {
      if (prevStep + 1 > focusStepData!.length - 1) {
        localStorage.setItem("setup", "true")
        onFinish()
        return prevStep
      }
      return prevStep + 1
    })
  }

  useEffect(() => {
    onResize()
    setFocusStepData([{
      label: "欢迎使用专注番茄钟！点击此处可以开始专注。",
      element: document.getElementById("focus-start")!,
    }, {
      label: "点击此处可以转到休息模式。",
      element: document.getElementById("focus-step")!,
    }, {
      label: "此处记录了你近30天的专注情况。",
      element: document.getElementById("focus-record")!,
    }, {
      label: "这里可以暂存待办任务，可右键事项打开详情菜单。",
      element: document.getElementById("to-do-list")!,
    }])
    setFocusingStep(0)
    addEventListener("resize", onResize)
    return () => removeEventListener("resize", onResize)
  }, [])

  return focusStepData && (<>
    <MotionCard
      layout
      initial={{ top: 0, left: 0 }}
      animate={{
        left: `${focusStepData[focusingStep].element.offsetLeft + 8}px`,
        top: `${focusStepData[focusingStep].element.offsetTop
          + 8
          + focusStepData[focusingStep].element.clientHeight
          + 8}px`,
      }}
      exit={{ opacity: 0 }}
      className="absolute z-50"
    >
      <p className="mb-2">{focusStepData[focusingStep].label}</p>
      <div className="flex justify-end items-center gap-4">
        <button
          className={classNames(
            "opacity-50",
            "hover:brightness-105 active:brightness-95 active:scale-95",
            "duration-200",
          )}
          onClick={prevTip}>
          上一步
        </button>
        <button
          className={classNames(
            "bg-primary shadow-md shadow-primary/50",
            "rounded-lg py-1 px-2",
            "hover:brightness-105 active:brightness-95 active:scale-95",
            "text-white duration-200",
          )}
          onClick={nextTip}>
          {focusStepData.length - 1 === focusingStep
            ? "完成"
            : "下一步"}
        </button>
      </div>
    </MotionCard>
    <motion.div
      key={"top"}
      initial={{ width: 0, height: 0, top: 0, left: 0 }}
      animate={{
        width: "100vw",
        height: `${focusStepData[focusingStep].element.offsetTop - 8}px`,
        top: 0,
        left: 0,
      }}
      exit={{ opacity: 0 }}
      className="absolute bg-black/50 z-30"
    />
    <motion.div
      key={"left"}
      initial={{ width: 0, height: 0, top: 0, left: 0 }}
      animate={{
        width: `${focusStepData[focusingStep].element.offsetLeft - 8}px`,
        height: `${focusStepData[focusingStep].element.clientHeight + 16}px`,
        top: `${focusStepData[focusingStep].element.offsetTop - 8}px`,
        left: 0,
      }}
      exit={{ opacity: 0 }}
      className="absolute bg-black/50 z-30"
    />
    <motion.div
      key={"right"}
      initial={{ width: 0, height: 0, top: 0, left: 0 }}
      animate={{
        width: `${screenWidth - focusStepData[focusingStep].element.offsetLeft - 8 - focusStepData[focusingStep].element.clientWidth
          }px`,
        height: `${focusStepData[focusingStep].element.clientHeight + 16}px`,
        top: `${focusStepData[focusingStep].element.offsetTop - 8}px`,
        left: `${focusStepData[focusingStep].element.offsetLeft
          + focusStepData[focusingStep].element.offsetWidth
          + 8}px`,
      }}
      exit={{ opacity: 0 }}
      className="absolute bg-black/50 z-30"
    />
    <motion.div
      key={"bottom"}
      initial={{ width: 0, height: 0, top: 0, left: 0 }}
      animate={{
        width: "100vw",
        height: `${screenHeight - focusStepData[focusingStep].element.offsetTop - 8 - focusStepData[focusingStep].element.clientHeight}px`,
        top: `${focusStepData[focusingStep].element.offsetTop + 8 + focusStepData[focusingStep].element.clientHeight}px`,
        left: 0,
      }}
      exit={{ opacity: 0 }}
      className="absolute bg-black/50 z-30"
    />
  </>)
}

export default Tutorial
