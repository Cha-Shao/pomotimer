"use client"

import {
  useEffect,
  useState,
} from "react"
import Card from "../Card"
import FocusBlock from "./RecordBlock"
import { useStore } from "@nanostores/react"
import { focusRecordStore } from "@/stores/record"
import recordController from "@/controllers/record"

const RecordSection = () => {
  const focusRecord = useStore(focusRecordStore)
  const [maxTime, setMaxTime] = useState(0)

  useEffect(() => {
    setMaxTime(recordController.init())
  }, [])

  return (
    <Card
      id="focus-record"
      className="mb-4"
      title="今日已专注"
    >
      <p className="mb-4">
        <span className="text-primary font-bold text-4xl mr-2">
          {Math.floor(focusRecord.focusTime[29] / (60 * 60))}
        </span>
        小时
        <span className="text-primary font-bold text-4xl mx-2">
          {Math.floor(focusRecord.focusTime[29] % (60 * 60) / 60)}
        </span>
        分钟
      </p>
      <p className="text-sm mb-2">近一月专注情况</p>
      <div className="flex flex-wrap gap-1 place-items-stretch mb-2">
        {focusRecord.focusTime.map((day, i) => (
          <FocusBlock key={i} date={new Date().getTime() - ((30 - 1) * 86400000 - i * 86400000)} maxTime={maxTime} currentTime={day} />
        ))}
      </div>
      <div className="flex justify-end items-center gap-1">
        <p className="text-xs">休息</p>
        {Array(5).fill(null).map((_, i) => (
          <FocusBlock
            key={i}
            date={0}
            maxTime={5}
            currentTime={i}
            noHover
            className="!w-3 !h-3"
          />
        ))}
        <p className="text-xs">专注</p>
      </div>
    </Card>
  )
}

export default RecordSection
