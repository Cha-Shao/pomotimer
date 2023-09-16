import { ToDo } from "@/types/toDoList"
import { HTMLAttributes } from "react"
import classNames from "classnames"
import { ContextMenu } from "../ContextMenu"

const ToDoCard = (
  props: ToDo
    & Omit<HTMLAttributes<HTMLDivElement>, "id">
    & {
      onSolve: () => void
      onDelete: () => void
    }
) => {
  const {
    id,
    content,
    solved,
    onSolve,
    onDelete,
    ...attrs
  } = props

  return (
    <ContextMenu
      id={`to-do-card-${id}`}
      menus={[{
        label: "完成",
        icon: "icon-[ph--check-bold]",
        action: onSolve,
      }, {
        label: "删除",
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
          attrs.className
        )}
      >
        <button className="flex justify-center items-center" onClick={onSolve}>
          {solved
            ? <span className="icon-[ph--check-circle-fill] text-lg text-primary" />
            : <span className="icon-[ph--circle-bold] text-lg" />}
        </button>
        <p className={classNames(
          solved && "line-through opacity-50"
        )}>{props.content}</p>
      </div>
    </ContextMenu>
  )
}

export default ToDoCard
