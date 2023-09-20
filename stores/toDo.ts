import { ToDo } from "@/types/toDo"
import { atom } from "nanostores"

export const toDoStore = atom<{
  list: ToDo[],
  current: ToDo | null,
  deleted: ToDo | null
}>({
  list: [],
  current: null,
  deleted: null,
})
