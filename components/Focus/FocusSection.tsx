"use client"

import Card from "../Card"
import ThrowShit from "./ThorwShit"
import FocusToDoCard from "./FocusToDoCard"
import { useStore } from "@nanostores/react"
import { focusStore } from "@/stores/focus"
import FocusStep from "./FocusStep"
import { Status } from "@/types/focus"
import FocusTimer from "./FocusTimer"
import FocusButton from "./FocusButton"

const FocusSection = () => {
  const focus = useStore(focusStore)

  return (
    <Card className="mb-4" title="开始专注">
      <FocusStep disabled={focus.status !== Status.Stop} />
      <FocusTimer />
      <FocusButton />
      <FocusToDoCard />
      <ThrowShit />
    </Card>
  )
}

export default FocusSection
