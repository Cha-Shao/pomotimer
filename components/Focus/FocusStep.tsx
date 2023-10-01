import { focusStore } from "@/stores/focus"
import { Step } from "@/types/focus"
import { useStore } from "@nanostores/react"
import classNames from "classnames"
import { motion } from "framer-motion"

const FocusStep = ({
  disabled,
}: {
  disabled: boolean
}) => {
  const step = useStore(focusStore).step

  return (
    <div
      id="focus-step"
      className={classNames(
        "flex gap-1",
        "w-fit p-1 mx-auto",
        "pbg rounded-full border border-border/10",
        "duration-500",
        disabled && "opacity-50"
      )}>
      <button
        disabled={disabled}
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
            className="absolute left-0 top-0 h-full w-full bg-primary rounded-full shadow-md shadow-primary/20"
            transition={{ duration: 0.2, type: "spring" }}
          />
        )}
      </button>
      <button
        disabled={disabled}
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
            className="absolute left-0 top-0 h-full w-full bg-primary rounded-full shadow-md shadow-primary/20"
            transition={{ duration: 0.2, type: "spring" }}
          />
        )}
      </button>
    </div>
  )
}

export default FocusStep
