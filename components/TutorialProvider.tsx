"use client"

import { useEffect, useState } from "react"
import Tutorial from "./Tutorial"
import { AnimatePresence } from "framer-motion"

const TutorialProvider = () => {
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    setShowTutorial(localStorage.getItem("setup") !== "true")
  }, [])

  const handleFinish = () => {
    setShowTutorial(false)
  }

  return (
    <AnimatePresence>
      {showTutorial && <Tutorial onFinish={handleFinish} />}
    </AnimatePresence>
  )
}

export default TutorialProvider
