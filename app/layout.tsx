import ContextMenuProvider from "@/components/ContextMenu/ContextMenuProvider"
import "./globals.css"
import type { Metadata } from "next"
import EnterAnimation from "@/components/EnterAnimation"

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
      <body className='pbg'>
        <EnterAnimation />
        <ContextMenuProvider>
          {children}
        </ContextMenuProvider>
      </body>
    </html>
  )
}
