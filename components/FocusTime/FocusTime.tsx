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
  lastUpdate: string
} = {
  focusTime: [
    0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464],
  lastUpdate: "2023-09-17T17:04:18.520Z",
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
          <FocusBlock key={i} maxTime={5} currentTime={i} className="!w-3 !h-3" />
        ))}
        <p className="text-xs">专注</p>
      </div>
    </Card>
  )
}

export default FocusTime
