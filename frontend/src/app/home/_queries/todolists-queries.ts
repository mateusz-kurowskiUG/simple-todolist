import type ITodoList from "@/app/interfaces/ITodoList";
import axios from "axios";

export const getUserTodolists = (accessToken: string) =>
  axios
    .get<ITodoList[]>(`http://localhost:5000/api/todolists/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data);

export const getTodoListById = (_id: string, accessToken: string) =>
  axios
    .get<ITodoList>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todolists/${_id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((res) => res.data);
