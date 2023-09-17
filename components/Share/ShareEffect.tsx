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
          exit={{ opacity: 0, y: "-90%" }}
          transition={{ duration: 0.1 }}
          className="absolute"
          style={{
            rotate: -22.5 + Math.round(Math.random() * 45),
            left: effect.x,
            top: effect.y,
          }}
        >
          <HeartIcon setEffects={setEffects} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

export default ShareEffect
