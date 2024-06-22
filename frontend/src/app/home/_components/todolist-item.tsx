import type ITodoList from "@/app/interfaces/ITodoList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createId } from "@paralleldrive/cuid2";
import React from "react";
import TaskItem from "./task-item";
import Link from "next/link";

const TodoListItem = ({ todoList }: { todoList: ITodoList }) => {
	return (
		<Card>
			<CardHeader className="text-center">
				<Link className="text-blue-600" href={`./home/${todoList._id}`}>
					{todoList.title}
				</Link>
			</CardHeader>
			<CardContent>
				{todoList.tasks.map((task) => (
					<TaskItem task={task} key={createId()} />
				))}
			</CardContent>
		</Card>
	);
};

export default TodoListItem;
