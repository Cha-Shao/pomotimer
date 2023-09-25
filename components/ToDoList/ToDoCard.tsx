import { ToDo } from "@/types/toDo"
import { HTMLAttributes } from "react"
import classNames from "classnames"
import ContextMenuTrigger from "../ContextMenu/ContextMenuTrigger"
import { toDoController } from "@/controllers/toDo"
import { useStore } from "@nanostores/react"
import { toDoStore } from "@/stores/toDo"

const ToDoCard = (
  props: ToDo & Omit<HTMLAttributes<HTMLDivElement>, "id">
) => {
  const {
    id,
    content,
    important,
    solved,
    ...attrs
  } = props

  const toDo = useStore(toDoStore)

  return (
    <ContextMenuTrigger
      menus={[{
        label: toDo.current?.id === id ? "正在专注" : "开始专注",
        icon: "icon-[ph--barbell-bold]",
        action: () => toDoController.current({
          id,
          content,
          important,
          solved,
        }),
      }, {
        label: solved ? "标记为未完成" : "标记为已完成",
        icon: solved ? "icon-[ph--circle-bold]" : "icon-[ph--check-circle-bold]",
        action: () => toDoController.solve(id),
      }, {
        label: important ? "取消重要标记" : "标记为重要",
        icon: "icon-[ph--star-bold]",
        action: () => toDoController.important(id),
      }, {
        label: "删除任务",
        icon: "icon-[ph--trash-bold]",
        action: () => toDoController.delete(id),
        danger: true,
      }]}
    >
      <div
        {...attrs}
        className={classNames(
          "relative",
          "p-2 list-none z-10 flex items-center gap-2",
          solved && "opacity-50",
          attrs.className,
        )}
      >
        <button
          className="flex justify-center items-center"
          onClick={() => toDoController.solve(id)}
        >
          {solved
            ? <span className="icon-[ph--check-circle-fill] text-lg text-primary" />
            : <span className="icon-[ph--circle-bold] text-lg" />}
        </button>
        <p className={classNames("grow", solved && "line-through")}>
          {props.content}
        </p>
        <button
          className="flex justify-center items-center group"
          onClick={() => toDoController.important(id)}
        >
          {important
            ? <span className="icon-[ph--star-fill] text-lg group-active:scale-50 duration-200 text-primary" />
            : <span className="icon-[ph--star-bold] text-lg group-active:scale-50 duration-200 opacity-50" />}
        </button>
      </div>
    </ContextMenuTrigger>
  )
}

export default ToDoCard
