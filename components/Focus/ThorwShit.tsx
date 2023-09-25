"use client"

import {
  Dispatch,
  SetStateAction,
  useEffect,
} from "react"
import { ShitIcon } from "./ShitIcon"
import { motion } from "framer-motion"

const ThrowShit = ({
  setShit,
}: {
  setShit: Dispatch<SetStateAction<number>>
}) => {
  useEffect(() => {
    setTimeout(() => {
      setShit(prevShit => prevShit + 1)
    }, 1000)
  })

  return (
    <motion.div
      initial={{ opacity: 1, x: "-50%", y: "-50%", scale: 0 }}
      animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1, rotate: "-15deg" }}
      exit={{ opacity: 0, x: "-50%", y: "100%", transition: { duration: 3 } }}
      className="fixed left-1/2 top-1/2 z-50"
    >
      <ShitIcon />
    </motion.div>
  )
}

export default ThrowShit
