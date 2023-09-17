import ContextMenuProvider from "@/components/ContextMenu/ContextMenuProvider"
import "./globals.css"
import type { Metadata } from "next"
import EnterAnimation from "@/components/EnterAnimation"
import localFont from "next/font/local"
import classNames from "classnames"

const Rubik = localFont({
  src: [{
    path: "../fonts/Rubik-Regular.ttf",
    weight: "500",
    style: "regular",
  }, {
    path: "../fonts/Rubik-Bold.ttf",
    weight: "700",
    style: "bold",
  }],
})

export const metadata: Metadata = {
  title: "目标",
  description: "管理时间，达成目标",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={classNames("pbg txt px-8 my-8", Rubik.className)}>
        <EnterAnimation />
        <ContextMenuProvider>
          {children}
        </ContextMenuProvider>
      </body>
    </html>
  )
}
