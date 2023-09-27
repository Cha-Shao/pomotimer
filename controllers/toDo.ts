import { toDoStore } from "@/stores/toDo"
import { ToDo } from "@/types/toDo"
import confetti from "canvas-confetti"

const toDoController = {
  add: (content: string): ToDo[] => {
    const newToDoList = [
      ...toDoStore.get().list,
      {
        id: new Date().getTime(),
        content,
        important: false,
        solved: false,
      },
    ]
    toDoStore.set({
      ...toDoStore.get(),
      list: newToDoList,
    })
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
    return newToDoList
  },
  solve: (id: number): ToDo[] => {
    let solved = false
    const newToDoList = toDoStore.get().list.map(toDo => {
      if (toDo.id === id) {
        solved = !toDo.solved
        if (solved) {
          confetti({
            origin: { x: 0 },
            angle: 60,
            colors: ["#fbd546", "#2ebafa", "#fb459e"],
          })
          confetti({
            origin: { x: 1 },
            angle: 120,
            colors: ["#fbd546", "#2ebafa", "#fb459e"],
          })
        }
        return {
          ...toDo,
          solved,
        }
      }
      return toDo
    })
    toDoStore.set({
      ...toDoStore.get(),
      list: newToDoList,
    })
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
    return newToDoList
  },
  important: (id: number): ToDo[] => {
    const newToDoList = toDoStore.get().list.map(toDo => {
      if (toDo.id === id) {
        return {
          ...toDo,
          important: !toDo.important,
        }
      }
      return toDo
    })
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
    toDoStore.set({
      ...toDoStore.get(),
      list: newToDoList,
    })
    return newToDoList
  },
  delete: (id: number): ToDo[] => {
    const deleteToDo = toDoStore.get().list.find(toDo => toDo.id === id)
    const newToDoList = toDoStore.get().list.filter(toDo => toDo.id !== id)
    localStorage.setItem("to-do-list", JSON.stringify(newToDoList))
    toDoStore.set({
      ...toDoStore.get(),
      deleted: deleteToDo!,
      list: newToDoList,
    })
    return newToDoList
  },
  current: (toDo: ToDo | null): void => {
    toDoStore.set({
      ...toDoStore.get(),
      current: toDo,
    })
  },
}

export default toDoController
