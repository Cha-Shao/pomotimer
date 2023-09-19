"use client"

import classNames from "classnames"
import Card from "./Card"
import CircleProgressBar from "./CircleProgressBar"
import { useState } from "react"
import {
  AnimatePresence,
  motion,
} from "framer-motion"

const Focus = () => {
  const [paused, setPaused] = useState(false)
  const [seconds, setSeconds] = useState<number | null>(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const handlePause = () => {
    setPaused(true)
    clearInterval(intervalId!)
  }
  const handleRestore = () => {
    setPaused(false)
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          handleFinish(intervalId)
          return null
        }
        return prevSeconds! - 1
      })
    }, 1000)
    setIntervalId(intervalId)
  }
  const handleFinish = (intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId!)
    setSeconds(null)
    new Notification("番茄钟", {
      body: "专注时间已结束，休息一下吧！",
    })
  }
  const handleStart = () => {
    setSeconds(25 * 60)
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          handleFinish(intervalId)
          return null
        }
        return prevSeconds! - 1
      })
      // }, 1000)
    }, 1)
    setIntervalId(intervalId)
  }

  return (
    <Card className="mb-4" title="开始专注">
      {seconds !== null ? (
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="flex">
              {seconds > 540 && (
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`tens-${Math.ceil(seconds / 60).toString().charAt(0)}`}
                    className="text-7xl text-primary"
                    initial={{ opacity: 0, y: -7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                  >
                    {Math.ceil(seconds / 60).toString().charAt(0)}
                  </motion.h1>
                </AnimatePresence>
              )}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`digit-${Math.ceil(seconds / 60).toString().charAt(Math.ceil(seconds / 60).toString().length - 1)}`}
                  className="text-7xl text-primary"
                  initial={{ opacity: 0, y: -7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                >
                  {Math.ceil(seconds / 60).toString().charAt(Math.ceil(seconds / 60).toString().length - 1)}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p>分钟</p>
          </div>
          <CircleProgressBar
            className="mx-auto"
            percentage={(25 * 60 - seconds) / (25 * 60) * 100}
            radius={150}
            width={400}
            weight={16}
          />
        </div>
      ) : (
        "准备开始"
      )}
      <div className="text-center mb-6">
        <button
          className={classNames(
            "rounded-full px-6 py-2 text-light",
            "bg-primary hover:brightness-105 active:brightness-95 active:scale-95",
            "duration-100",
            "shadow-lg shadow-primary/25",
            "text-lg font-bold"
          )}
          onClick={handleStart}
        >
          开始专注
        </button>
      </div>
    </Card>
  )
}

export default Focus
