import type ITodoList from "@/app/interfaces/ITodoList";
import { create } from "zustand";

interface IUserTodolistStore {
  todoLists: ITodoList[];
  setTodoLists: (todoLists: ITodoList[]) => void;
  replaceTodoList: (todoList: ITodoList) => void;
}

export const useUserTodolistsStore = create<IUserTodolistStore>((set) => ({
  todoLists: [],
  setTodoLists: (todoLists) => set({ todoLists }),
  replaceTodoList: (todoList) =>
    set((state) => ({
      todoLists: state.todoLists.map((innerTodoList) =>
        innerTodoList._id === todoList._id ? todoList : innerTodoList
      ),
    })),
}));

interface ICurrentTodolistStore {
  todoList: ITodoList;
  setTodoList: (todoList: ITodoList) => void;
}

export const useCurrentTodolistStore = create<ICurrentTodolistStore>((set) => ({
  todoList: {} as ITodoList,
  setTodoList: (todoList) => set({ todoList }),
}));
