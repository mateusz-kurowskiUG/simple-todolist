import type ITask from "@/app/interfaces/ITask";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createId } from "@paralleldrive/cuid2";
import axios from "axios";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
	useCurrentTodolistStore,
	useUserTodolistsStore,
} from "../_stores/todolist-store";
import type ITodoList from "@/app/interfaces/ITodoList";

const TaskItem = ({
	task,
	todoListId,
}: { task: ITask; todoListId: string }) => {
	const { todoLists, setTodoLists, replaceTodoList } = useUserTodolistsStore();

	const { data: session } = useSession();
	const deleteTask = async (taskId: string, accessToken: string) => {
		try {
			const updated = await axios
				.delete<ITodoList>(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todolists/${todoListId}/${taskId}`,
					{
						headers: { Authorization: `Bearer ${accessToken}` },
					},
				)
				.then((res) => res.data);

			replaceTodoList(updated);
		} catch (e) {}
	};

	return (
		<div className="flex-col">
			<p className="flex justify-between">
				<div className="flex items-center gap-2">
					<Checkbox id={task._id} />
					<Label htmlFor={task._id}>{task.text}</Label>
				</div>
				<X
					onClick={() => deleteTask(task._id, session.token)}
					className="text-red-600 hover:cursor-pointer"
				/>
			</p>
		</div>
	);
};

export default TaskItem;
