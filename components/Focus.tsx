"use client"

import classNames from "classnames"
import Card from "./Card"
import CircleProgressBar from "./CircleProgressBar"
import { useState } from "react"

const Focus = () => {
  const [minute, setMinute] = useState(15)

  return (
    <Card className="mb-4" title="开始专注">
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-7xl text-primary">{minute}</h1>
          <p>分钟</p>
        </div>
        <CircleProgressBar
          className="mx-auto"
          percentage={((25 - minute) / 25) * 100}
          radius={150}
          width={400}
          weight={16}
        />
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="px-2 py-1 rounded-full border-2 border-primary">专注</span>
          <span className="px-2 py-1 rounded-full border-2 border-primary/20">休息</span>
        </div>
      </div>
      <div className="text-center">
        <button className={classNames(
          "rounded-full px-6 py-2 text-light",
          "bg-primary hover:brightness-105 active:brightness-95",
          "duration-100",
          "shadow-lg shadow-primary/25",
          "text-lg font-bold"
        )}>
          开始专注
        </button>
      </div>
    </Card>
  )
}

export default Focus
