import "./globals.css"
import type { Metadata } from "next"
import InitAnimation from "@/components/InitAnimation"
import localFont from "next/font/local"
import classNames from "classnames"
import Header from "@/components/Header/Header"
import Providers from "./providers"
import Footer from "@/components/Footer"
import { HighlightInit } from "@highlight-run/next/client"
import {
  HIGHLIGHT_PROJECT_ID,
  HIGHLIGHT_SERVICE_NAME,
} from "@/config"
import TutorialProvider from "@/components/TutorialProvider"

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
  return (<>
    {HIGHLIGHT_PROJECT_ID && (
      <HighlightInit
        projectId={HIGHLIGHT_PROJECT_ID}
        serviceName={HIGHLIGHT_SERVICE_NAME}
        tracingOrigins
        networkRecording={{
          enabled: true,
          recordHeadersAndBody: true,
          urlBlocklist: [],
        }}
      />
    )}
    <html lang="zh-CN">
      <body className={classNames("pbg txt max-w-7xl min-w-[1024px] mx-auto px-8", Rubik.className)}>
        <TutorialProvider />
        <InitAnimation />
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  </>)
}
