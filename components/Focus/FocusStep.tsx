import { focusStore } from "@/stores/focus"
import { Step } from "@/types/focus"
import { useStore } from "@nanostores/react"
import classNames from "classnames"
import { motion } from "framer-motion"

const FocusStep = () => {
  const step = useStore(focusStore).step

  return (
    <div className="flex gap-1 p-1 pbg rounded-full w-fit mx-auto">
      <button
        className="py-2 px-6 relative"
        onClick={() => focusStore.set({
          ...focusStore.get(),
          step: Step.Focus,
        })}
      >
        <span className={classNames(
          "relative z-10 duration-100",
          step === Step.Focus && "text-light font-bold"
        )}>
          专注
        </span>
        {step === Step.Focus && (
          <motion.div
            layoutId="step"
            className="absolute left-0 top-0 h-full w-full bg-primary rounded-full"
            transition={{ duration: 0.2, type: "spring" }}
          />
        )}
      </button>
      <button
        className="py-2 px-6 relative"
        onClick={() => focusStore.set({
          ...focusStore.get(),
          step: Step.Break,
        })}
      >
        <span className={classNames(
          "relative z-10 duration-100",
          step === Step.Break && "text-light font-bold"
        )}>
          休息
        </span>
        {step === Step.Break && (
          <motion.div
            layoutId="step"
            className="absolute left-0 top-0 h-full w-full bg-primary rounded-full"
            transition={{ duration: 0.2, type: "spring" }}
          />
        )}
      </button>
    </div>
  )
}

export default FocusStep
