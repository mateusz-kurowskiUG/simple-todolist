import type ITask from "./ITask";

interface ITodoList {
  _id: string;
  title: string;
  deadline: string;
  createdAt: string;
  tasks: ITask[];
  userId: string;
}
export default ITodoList;
