import Card from "@/components/Card"
import ToDoList from "@/components/ToDoList/ToDoList"
import FocusTime from "@/components/FocusTime/FocusTime"
import Focus from "@/components/Focus/Focus"
import Share from "@/components/Share/Share"

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-4">
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
        <Share />
      </section>
    </div>
  )
}
