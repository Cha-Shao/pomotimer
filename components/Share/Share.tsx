"use client"

import classNames from "classnames"
import Card from "../Card"
import ShareEffect, { EffectProps } from "./ShareEffect"
import {
  MouseEvent,
  useRef,
  useState,
} from "react"

const Share = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [effects, setEffects] = useState<EffectProps[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setEffects(prevEffects => ([
      ...prevEffects,
      {
        id: new Date().getTime(),
        x: e.clientX - buttonRef.current!.offsetLeft,
        y: e.clientY + window.scrollY - buttonRef.current!.offsetTop,
      },
    ]))
  }

  return (
    <Card>
      <h2 className="font-bold text-2xl mb-4">分享番茄钟</h2>
      <p className="mb-4">如果觉得好用，请向你的朋友分享这个网站！</p>
      <button
        ref={buttonRef}
        className={classNames(
          "border border-border",
          "rounded-full h-10 w-full",
          "flex items-center p-1",
          "hover:bg-primary hover:text-light hover:border-primary",
          "group duration-100",
          "relative",
        )}
        onClick={handleClick}
      >
        <span className="h-8 w-8 rounded-full flex justify-center items-center invisible" />
        <span className="grow">复制链接</span>
        <span className="h-8 w-8 rounded-full bg flex justify-center items-center text-dark dark:text-light">
          <span className="icon-[ph--link-bold]" />
        </span>
        <ShareEffect effects={effects} setEffects={setEffects} />
      </button>
    </Card>
  )
}

export default Share
