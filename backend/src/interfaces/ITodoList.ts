import type ITask from "./ITask";

export interface ITodoList {
  _id: string;
  userId: string;
  title: string;
  deadline: Date;
  createdAt: Date;
  tasks: ITask[];
}
