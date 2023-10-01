"use client"

import { focusStore } from "@/stores/focus"
import { settingsStore } from "@/stores/settings"
import { Status } from "@/types/focus"
import { useStore } from "@nanostores/react"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import { HourGlassIcon } from "./HourGlassIcon"
import CircleProgressBar from "../CircleProgressBar"

const FocusTimer = () => {
  const focus = useStore(focusStore)
  const settings = useStore(settingsStore)

  return (
    <div className="relative">
      <p className="absolute">{JSON.stringify(focus)}</p>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <AnimatePresence mode="wait">
          {focus.status === Status.Stop ? (
            <motion.p
              key={"start"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="text-xl"
            >
              准备开始专注
            </motion.p>
          ) :
            !settings.hideTime ? (
              <motion.div
                key={"run/pause-timer"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2, type: "spring" }}
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`digit-${Math.ceil(focus.seconds! / 60).toString().charAt(Math.ceil(focus.seconds! / 60).toString().length - 1)}`}
                    className="text-7xl text-primary"
                    initial={{ opacity: 0, y: -7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                  >
                    {Math.ceil(focus.seconds! / 60)}
                  </motion.h1>
                </AnimatePresence>
                <p>分钟</p>
              </motion.div>
            ) : (
              <motion.div
                key={"run/pause-hourglass"}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2, type: "spring" }}
              >
                <HourGlassIcon className="animate-pulse" />
              </motion.div>
            )}
        </AnimatePresence>
      </div>
      <CircleProgressBar
        className="mx-auto"
        percentage={
          focus.seconds
            ? Math.max(1, (25 * 60 - focus.seconds) / (25 * 60) * 100)
            : 0
        }
        radius={150}
        width={400}
        weight={16}
      />
    </div>
  )
}

export default FocusTimer
