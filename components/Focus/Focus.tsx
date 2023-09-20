"use client"

import classNames from "classnames"
import Card from "../Card"
import CircleProgressBar from "../CircleProgressBar"
import { useState } from "react"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import { sendNotificationStore } from "@/stores/notification"
import ThrowShit from "./ThorwShit"
import FocusToDoCard from "./FocusToDoCard"

const devSpeed = 1000

enum Status {
  Stop,
  Run,
  Pause
}
enum Step {
  Focus,
  Break
}
const notificationMessage = [
  "专注时间已结束，休息一下吧！",
  "休息时间已结束，加油！",
]

const Focus = () => {
  const [status, setStatus] = useState<Status>(Status.Stop)
  const [shit, setShit] = useState<number | null>(0)
  const [step, setStep] = useState<Step>(Step.Focus)
  const [seconds, setSeconds] = useState<number | null>(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const togglePause = () => {
    if (status === Status.Run) {
      setStatus(Status.Pause)
      clearInterval(intervalId!)
      if (shit !== null)
        setShit(prevTime => prevTime! + 1)
    }
    else {
      setStatus(Status.Run)
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 1) {
            handleFinish()
            return null
          }
          return prevSeconds! - 1
        })
      }, devSpeed)
      setIntervalId(intervalId)
    }
  }
  const handleFinish = (type: "finish" | "cancel" = "finish") => {
    clearInterval(intervalId!)
    setSeconds(null)
    setStatus(Status.Stop)
    setShit(0)
    if (sendNotificationStore.get() && type === "finish")
      new Notification(
        "番茄钟", {
        body: notificationMessage[step],
        icon: "/icon.jpg",
      })
  }
  const handleStart = () => {
    setSeconds(25 * 60)
    setStatus(Status.Run)
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          handleFinish()
          return null
        }
        return prevSeconds! - 1
      })
    }, devSpeed)
    setIntervalId(intervalId)
  }

  return (
    <Card className="mb-4" title="开始专注">
      {seconds !== null ? (
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="flex">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`digit-${Math.ceil(seconds / 60).toString().charAt(Math.ceil(seconds / 60).toString().length - 1)}`}
                  className="text-7xl text-primary"
                  initial={{ opacity: 0, y: -7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                >
                  {Math.ceil(seconds / 60)}
                </motion.h1>
              </AnimatePresence>
            </div>
            <p>分钟</p>
          </div>
          <CircleProgressBar
            className="mx-auto"
            percentage={Math.max(1, (25 * 60 - seconds) / (25 * 60) * 100)}
            radius={150}
            width={400}
            weight={16}
          />
        </div>
      ) : (
        "准备开始"
      )}
      <div>
        <div className="relative w-fit mx-auto">
          {status === Status.Stop ? (
            <motion.button
              className={classNames(
                "rounded-full px-6 py-2 text-light",
                "bg-primary hover:brightness-105 active:brightness-95 active:scale-95",
                "inline-flex justify-center items-center",
                "duration-100",
                "shadow-lg shadow-primary/25",
                "text-lg font-bold"
              )}
              transition={{ duration: 0.1 }}
              layoutId="focus-button"
              onClick={handleStart}
            >
              开始专注
            </motion.button>
          ) : (
            <motion.button
              className={classNames(
                "h-12 w-12",
                "rounded-full border border-border",
                "inline-flex justify-center items-center",
                "group",
              )}
              transition={{ duration: 0.1 }}
              layoutId="focus-button"
              onClick={togglePause}
            >
              <span className={classNames(
                status === Status.Run
                  ? "icon-[ph--pause-bold] text-lg"
                  : "icon-[ph--play-bold] text-lg",
                "text-xl group-active:scale-50 duration-100"
              )} />
            </motion.button>
          )}
          <AnimatePresence>
            {status === Status.Pause && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.1 }}
                className={classNames(
                  "absolute -right-12 top-1",
                  "h-10 w-10",
                  "rounded-full border border-border",
                  "inline-flex justify-center items-center",
                  "group"
                )}
                onClick={() => handleFinish("cancel")}
              >
                <span className="icon-[ph--x-bold] text-lg group-active:scale-50 duration-100" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <FocusToDoCard />
      <AnimatePresence>
        {(shit === 5 && shit !== null) && <ThrowShit setShit={setShit} />}
      </AnimatePresence>
    </Card>
  )
}

export default Focus
