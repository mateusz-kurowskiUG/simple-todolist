import type ITodoList from "@/app/interfaces/ITodoList";
import axios from "axios";

export const getTodolists = (accessToken: string) =>
  axios
    .get<ITodoList[]>("http://localhost:5000/api/admin/todolists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);

export const getTodoListById = (todolistId: string, accessToken: string) =>
  axios
    .get<ITodoList>(`http://localhost:5000/api/admin/todolists/${todolistId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);
