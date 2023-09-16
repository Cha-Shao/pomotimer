"use client"

import Card from "@/components/Card"
import ToDoListCard from "@/components/ToDoList/ToDoListCard"
import ContextMenuTrigger from "@/components/ContextMenu/ContextMenuTrigger"

const
  hour = 1,
  minute = 15

export default function Home() {
  return (
    <main className="max-w-7xl min-w-[1024px] mx-auto grid grid-cols-3 gap-4 my-6">
      <section className="col-span-2">
        <ContextMenuTrigger menus={[{
          label: "accept",
          action: () => console.log("ok"),
        }, {
          label: "reject",
          danger: true,
        }]}>
          <Card>
            abc
          </Card>
        </ContextMenuTrigger>
      </section>
      <section>
        <Card className="mb-4">
          <h3 className="mb-4">今日已专注</h3>
          <p>
            <span className="text-primary font-bold text-3xl">{hour}</span>
            小时
            <span className="text-primary font-bold text-3xl">{minute}</span>
            分钟
          </p>
        </Card>
        <ToDoListCard />
      </section>
    </main>
  )
}
