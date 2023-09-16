import { ToDo } from "@/types/toDoList"
import { HTMLAttributes } from "react"
import classNames from "classnames"
import ContextMenuTrigger from "../ContextMenu/ContextMenuTrigger"

const ToDoCard = (
  props: ToDo
    & Omit<HTMLAttributes<HTMLDivElement>, "id">
    & {
      switchSolve: () => void
      switchImportant: () => void
      onDelete: () => void
    }
) => {
  const {
    id,
    content,
    important,
    solved,
    switchSolve,
    switchImportant,
    onDelete,
    ...attrs
  } = props

  return (
    <ContextMenuTrigger
      menus={[{
        label: solved ? "标记为未完成" : "标记为已完成",
        icon: solved ? "icon-[ph--circle-bold]" : "icon-[ph--check-circle-bold]",
        action: switchSolve,
      }, {
        label: important ? "取消重要标记" : "标记为重要",
        icon: "icon-[ph--star-bold]",
        action: switchImportant,
      }, {
        label: "删除任务",
        icon: "icon-[ph--trash-bold]",
        action: onDelete,
        danger: true,
      }]}
    >
      <div
        {...attrs}
        className={classNames(
          "relative",
          "p-2 list-none z-10 flex items-center gap-2",
          solved && "opacity-50",
          attrs.className
        )}
      >
        <button className="flex justify-center items-center" onClick={switchSolve}>
          {solved
            ? <span className="icon-[ph--check-circle-fill] text-lg text-primary" />
            : <span className="icon-[ph--circle-bold] text-lg" />}
        </button>
        <p className={classNames("grow", solved && "line-through")}>
          {props.content}
        </p>
        <button className="flex justify-center items-center active:scale-50 duration-200" onClick={switchImportant}>
          {important
            ? <span className="icon-[ph--star-fill] text-lg text-primary" />
            : <span className="icon-[ph--star-bold] text-lg opacity-50" />}
        </button>
      </div>
    </ContextMenuTrigger>
  )
}

export default ToDoCard
