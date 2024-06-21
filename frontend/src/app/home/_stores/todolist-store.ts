import { create } from "zustand";

const useTodolistsStore = create((set) => ({
  todolists: [],
  setTodolists: (todolists: object[]) => set(todolists),
}));
