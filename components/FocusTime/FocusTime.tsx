"use client"

import {
  useCallback,
  useEffect,
  useState,
} from "react"
import Card from "../Card"
import FocusBlock from "./FocusBlock"

const focusData: {
  focusTime: [number, ...Array<number>] & { length: 30 }
  lastUpdate: Date
} = {
  focusTime: [127, 171, 115, 136, 192, 185, 120, 18, 125, 0, 132, 128, 127, 123, 149, 111, 0, 133, 145, 0, 0, 0, 164, 187, 133, 110, 121, 19, 126, 192],
  lastUpdate: new Date(),
}

const FocusTime = () => {
  const [maxTime, setMaxTime] = useState(0)

  const getMaxFocusTime = useCallback(() => {
    let maxTime = 0
    for (const time of focusData.focusTime) {
      maxTime = Math.max(maxTime, time)
    }
    setMaxTime(maxTime)
  }, [])

  useEffect(() => {
    getMaxFocusTime()
    return () => setMaxTime(0)
  }, [getMaxFocusTime])

  return (
    <Card className="mb-4" title="今日已专注">
      <p className="mb-4">
        <span className="text-primary font-bold text-4xl mr-2">
          {Math.floor(focusData.focusTime[focusData.focusTime.length - 1] / 60)}
        </span>
        小时
        <span className="text-primary font-bold text-4xl mx-2">
          {focusData.focusTime[focusData.focusTime.length - 1] % 60}
        </span>
        分钟
      </p>
      <p className="text-sm mb-2">近一月专注情况</p>
      <div className="flex flex-wrap gap-1 place-items-stretch mb-2">
        {focusData.focusTime.map((day, i) => (
          <FocusBlock key={i} maxTime={maxTime} currentTime={day} />
        ))}
      </div>
      <div className="flex justify-end items-center gap-1">
        <p className="text-xs">分心</p>
        {Array(5).fill(null).map((_, i) => (
          <FocusBlock key={i} maxTime={5} currentTime={i} className="w-3 h-3" />
        ))}
        <p className="text-xs">专注</p>
      </div>
    </Card>
  )
}

export default FocusTime
