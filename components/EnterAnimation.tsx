"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Logo from "@/public/icon.jpg"

const EnterAnimation = () => {
  return (
    <motion.div
      initial={{ height: "100vh" }}
      animate={{ height: 0 }}
      transition={{ delay: 1 }}
      className="fixed top-0 left-0 w-screen bg-primary z-50 flex justify-center items-center overflow-hidden"
    >
      <div className="rounded-full bg overflow-hidden">
        <Image src={Logo} alt="" />
      </div>
    </motion.div>
  )
}

export default EnterAnimation
