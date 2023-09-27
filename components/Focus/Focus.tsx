"use client"

import classNames from "classnames"
import Card from "../Card"
import CircleProgressBar from "../CircleProgressBar"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import ThrowShit from "./ThorwShit"
import FocusToDoCard from "./FocusToDoCard"
import { useStore } from "@nanostores/react"
import { focusStore } from "@/stores/focus"
import FocusStep from "./FocusStep"
import { Status } from "@/types/focus"
import focusController from "@/controllers/focus"

const Focus = () => {
  const focus = useStore(focusStore)

  return (
    <Card className="mb-4" title="开始专注">
      <FocusStep />
      <div className="relative">
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
            ) : (
              <motion.div
                key={"run/pause"}
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
      <div className="mb-4 text-center h-16 grid place-items-center">
        <AnimatePresence mode="wait">
          {focus.status === Status.Stop ? (
            <motion.button
              key={"start"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring" }}
              className={classNames(
                "rounded-full px-6 py-2 text-light",
                "bg-primary hover:brightness-105 active:brightness-95 active:scale-95",
                "inline-flex justify-center items-center",
                "shadow-lg shadow-primary/25",
                "text-lg font-bold"
              )}
              onClick={() => focusController.start()}
            >
              开始专注
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, type: "spring" }}
              className="flex gap-4 justify-center items-center"
            >
              <AnimatePresence>
                {focus.status === Status.Pause && (
                  <motion.button
                    key={"cancel"}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.1 }}
                    className={classNames(
                      "h-12 w-12",
                      "rounded-full border-2 border-border/10",
                      "inline-flex justify-center items-center",
                      "group",
                      "hover:bg-border/10 duration-100",
                    )}
                    onClick={focusController.cancel}
                  >
                    <span className="icon-[ph--stop-bold] text-lg group-active:scale-50 duration-100" />
                  </motion.button>
                )}
                <button
                  className={classNames(
                    "h-16 w-16",
                    "rounded-full border-2 border-border/10",
                    "inline-flex justify-center items-center",
                    "group",
                    "hover:bg-border/10 duration-100",
                  )}
                  onClick={focusController.togglePause}
                >
                  <span className={classNames(
                    focus.status === Status.Run
                      ? "icon-[ph--pause-bold]"
                      : "icon-[ph--play-bold]",
                    "text-2xl group-active:scale-50 duration-100"
                  )} />
                </button>
                {focus.status === Status.Pause && (
                  <motion.button
                    key={"finish"}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.1 }}
                    className={classNames(
                      "h-12 w-12",
                      "rounded-full border-2 border-border/10",
                      "inline-flex justify-center items-center",
                      "group",
                      "hover:bg-border/10 duration-100",
                    )}
                    onClick={focusController.finish}
                  >
                    <span className="icon-[ph--fast-forward-bold] text-lg group-active:scale-50 duration-100" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FocusToDoCard />
      <ThrowShit />
    </Card>
  )
}

export default Focus
