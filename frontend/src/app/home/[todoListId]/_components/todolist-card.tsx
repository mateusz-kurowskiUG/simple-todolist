import type ITodoList from "@/app/interfaces/ITodoList";
import React from "react";
import TaskItem from "../../_components/task-item";
import { createId } from "@paralleldrive/cuid2";

const TodoListCard = ({
	todoList: { createdAt, deadline, tasks, title },
}: { todoList: ITodoList }) => {
	const creationStr = createdAt.slice(0, 10);
	const deadlineDate = new Date(deadline).getTime();
	const deadlineStr = deadline.slice(0, 10);
	return (
		<div className="m-2">
			<div className="title text-center flex justify-between">
				<div className="text-2xl underline">{title}</div>
				<div>
					<div>Created: {creationStr}</div>
					<div
						className={`${deadlineDate < Date.now() ? "text-red-600 italic font-bold" : null}`}
					>
						Deadline: {deadlineStr}
					</div>
				</div>
			</div>
			<div className="tasks">
				{tasks.map((task) => (
					<TaskItem key={createId()} task={task} />
				))}
			</div>
		</div>
	);
};

export default TodoListCard;
