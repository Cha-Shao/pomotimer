import "./globals.css"
import type { Metadata } from "next"

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
      <body className='pbg'>{children}</body>
    </html>
  )
}
