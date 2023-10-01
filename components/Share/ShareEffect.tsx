"use client"

import {
  AnimatePresence,
  motion,
} from "framer-motion"
import { HeartIcon } from "./HeartIcon"
import {
  Dispatch,
  SetStateAction,
} from "react"

export interface EffectProps {
  id: number,
  x: number,
  y: number
  rotate: number,
}

const ShareEffect = ({
  effects,
  setEffects,
}: {
  effects: EffectProps[]
  setEffects: Dispatch<SetStateAction<EffectProps[]>>
}) => {

  return (
    <AnimatePresence>
      {effects.map(effect => (
        <motion.div
          key={effect.id}
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0, y: "-90%", transition: { type: "just" } }}
          transition={{
            duration: 0.1,
            type: "spring",
            damping: 16,
            stiffness: 256,
          }}
          className="absolute pointer-events-none"
          style={{
            left: effect.x,
            top: effect.y,
            rotate: effect.rotate,
          }}
        >
          <HeartIcon setEffects={setEffects} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

export default ShareEffect
