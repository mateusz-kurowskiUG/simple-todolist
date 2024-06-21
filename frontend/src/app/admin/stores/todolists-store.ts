import type ITodoList from "@/app/interfaces/ITodoList";
import { create } from "zustand";

const useAdminTodoListStore = create((set) => ({
  todolists: [],
  setUsers: (todolists: ITodoList[]) => set(() => ({ todolists })),
}));
export default useAdminTodoListStore;
