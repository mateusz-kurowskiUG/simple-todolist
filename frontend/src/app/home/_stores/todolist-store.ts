import type ITodoList from "@/app/interfaces/ITodoList";
import { create } from "zustand";

interface IUserTodolistStore {
  todolists: ITodoList[];
  setTodolists: (todolists: ITodoList[]) => void;
}

export const useUserTodolistsStore = create<IUserTodolistStore>((set) => ({
  todolists: [],
  setTodolists: (newTodolists) => set({ todolists: newTodolists }),
}));
