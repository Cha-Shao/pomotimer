import Card from "@/components/Card"
import ToDoList from "@/components/ToDoList/ToDoList"
import FocusTime from "@/components/FocusTime"
import Focus from "@/components/Focus"
import classNames from "classnames"

export default function Home() {
  return (
    <main className="max-w-7xl min-w-[1024px] mx-auto grid grid-cols-3 gap-4">
      <section className="col-span-2">
        <Focus />
        <Card>
          <p>
            番茄工作法是弗朗切斯科·西里洛在1980年代后期开发的一种时间管理方法，它使用厨房计时器将工作分成间隔，通常为25分钟，由短暂的休息间隔。每个间隔都被称为番茄工作法，来自意大利语中的番茄，以西里洛在大学生时使用的番茄形厨房计时器命名。
          </p>
        </Card>
      </section>
      <section>
        <FocusTime />
        <ToDoList />
        <Card>
          <h2 className="font-bold text-2xl mb-4">分享番茄钟</h2>
          <p className="mb-4">如果你觉得好用，请向你的朋友分享这个网站！</p>
          <button className={classNames(
            "border border-border",
            "rounded-full h-10 w-full",
            "flex items-center p-1",
            "hover:bg-primary hover:text-light hover:border-primary",
            "group duration-100",
          )}>
            <span className="h-8 w-8 rounded-full flex justify-center items-center invisible" />
            <span className="grow">分享网站</span>
            <span className="h-8 w-8 rounded-full bg flex justify-center items-center text-dark">
              <span className="icon-[ph--share-bold]" />
            </span>
          </button>
        </Card>
      </section>
    </main>
  )
}
