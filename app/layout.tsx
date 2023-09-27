import "./globals.css"
import type { Metadata } from "next"
import EnterAnimation from "@/components/EnterAnimation"
import localFont from "next/font/local"
import classNames from "classnames"
import Header from "@/components/Header"
import Providers from "./providers"
import Footer from "@/components/Footer"

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
  title: "POMOTIMER",
  description: "帮助自己管理时间的工具",
  keywords: "番茄钟, POMOTER, pomodoro",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={classNames("pbg txt max-w-7xl min-w-[1024px] mx-auto px-8", Rubik.className)}>
        <EnterAnimation />
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
