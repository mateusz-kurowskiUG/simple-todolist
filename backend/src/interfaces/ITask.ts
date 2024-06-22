import type ETaskStatus from "../enums/ETaskStatus";

export default interface ITask {
  _id: string;
  text: string;
  status: ETaskStatus;
}
