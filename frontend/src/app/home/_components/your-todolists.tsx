import React from "react";
import { useUserTodolistsStore } from "../_stores/todolist-store";
import NewTodoListDialog from "./new-todolist-dialog";
import TodoListItem from "./todolist-item";
import { createId } from "@paralleldrive/cuid2";

const YourTodoLists = () => {
	const { todoLists } = useUserTodolistsStore();

	return (
		<div className="space-y-6">
			{todoLists.length === 0 ? (
				<div className=" text-center text-xl">No todolists yet.</div>
			) : (
				<div className="flex flex-col justify-center space-y-5 m-5">
					{todoLists.map((todoList) => (
						<TodoListItem key={createId()} todoList={todoList} />
					))}
				</div>
			)}
			<div className="text-center text-blue-600">
				<NewTodoListDialog />
			</div>
		</div>
	);
};

export default YourTodoLists;
