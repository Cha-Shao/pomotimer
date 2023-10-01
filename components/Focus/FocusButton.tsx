"use client"

import focusController from "@/controllers/focus"
import { focusStore } from "@/stores/focus"
import { Status } from "@/types/focus"
import { useStore } from "@nanostores/react"
import classNames from "classnames"
import {
  AnimatePresence,
  motion,
} from "framer-motion"

const FocusButton = () => {
  const focus = useStore(focusStore)

  return (
    <div className="mb-4 text-center h-16 grid place-items-center">
      <AnimatePresence mode="wait">
        {focus.status === Status.Stop ? (
          <motion.button
            id="focus-start"
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
  )
}

export default FocusButton
