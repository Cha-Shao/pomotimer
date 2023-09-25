"use client"

import classNames from "classnames"
import Card from "../Card"
import CircleProgressBar from "../CircleProgressBar"
import { useState } from "react"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import ThrowShit from "./ThorwShit"
import FocusToDoCard from "./FocusToDoCard"
import { useStore } from "@nanostores/react"
import { focusStore } from "@/stores/focus"
import { focusController } from "@/controllers/Focus"
import { Status, Step } from "@/types/focus"

const Focus = () => {
  const focus = useStore(focusStore)
  const [shit, setShit] = useState(0)

  return (
    <Card className="mb-4" title="开始专注">
      <div className="flex gap-1 p-1 pbg rounded-full w-fit mx-auto">
        <div className={classNames(
          "px-4 py-1 inline-block rounded-full text-lg",
          focus.step === Step.Focus ? "bg-primary text-light" : "bg"
        )}>专注</div>
        <div className={classNames(
          "px-4 py-1 bg inline-block rounded-full text-lg",
          focus.step === Step.Break ? "bg-primary text-light" : "bg"
        )}>休息</div>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <AnimatePresence mode="wait">
            {focus.seconds ? (
              <motion.div
                key={"run/pause"}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`digit-${Math.ceil(focus.seconds / 60).toString().charAt(Math.ceil(focus.seconds / 60).toString().length - 1)}`}
                    className="text-7xl text-primary"
                    initial={{ opacity: 0, y: -7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                  >
                    {Math.ceil(focus.seconds / 60)}
                  </motion.h1>
                </AnimatePresence>
                <p>分钟</p>
              </motion.div>
            ) : (
              <motion.p
                key={"stop"}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="text-xl"
              >
                准备开始专注
              </motion.p>
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
      <div>
        <div className="relative w-fit mx-auto mb-6">
          {focus.status === Status.Stop ? (
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
              onClick={() => focusController.start()}
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
              onClick={() => {
                focusController.togglePause()
                setShit(prevShit => prevShit + 1)
              }}
            >
              <span className={classNames(
                focus.status === Status.Run
                  ? "icon-[ph--pause-bold] text-lg"
                  : "icon-[ph--play-bold] text-lg",
                "text-xl group-active:scale-50 duration-100"
              )} />
            </motion.button>
          )}
          <AnimatePresence>
            {focus.status === Status.Pause && (<>
              <motion.button
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.1 }}
                className={classNames(
                  "absolute -left-14 top-1",
                  "h-10 w-10",
                  "rounded-full border border-border",
                  "inline-flex justify-center items-center",
                  "group"
                )}
                onClick={() => focusController.finish()}
              >
                <span className="icon-[ph--x-bold] text-lg group-active:scale-50 duration-100" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.1 }}
                className={classNames(
                  "absolute -right-14 top-1",
                  "h-10 w-10",
                  "rounded-full border border-border",
                  "inline-flex justify-center items-center",
                  "group"
                )}
                onClick={focusController.skip}
              >
                <span className="icon-[ph--fast-forward-bold] text-lg group-active:scale-50 duration-100" />
              </motion.button>
            </>
            )}
          </AnimatePresence>
        </div>
      </div>
      <FocusToDoCard />
      <AnimatePresence>
        {(shit === 9) && <ThrowShit setShit={setShit} />}
      </AnimatePresence>
    </Card>
  )
}

export default Focus
