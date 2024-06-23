"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { getTodoListById } from "../../_queries/todolists-queries";
import TodoListCard from "./todolist-card";
import NewTaskForm from "./new-task-form";
import { useCurrentTodolistStore } from "../../_stores/todolist-store";
import DeleteTodoListButton from "./delete-todolist-button";

const TodoListDetailsLayout = ({ todoListId }: { todoListId: string }) => {
	const { data: session } = useSession({ required: true });
	const { data, isLoading, error } = useQuery({
		queryKey: ["todoList"],
		queryFn: () => getTodoListById(todoListId, session.token),
	});
	const { setTodoList, todoList } = useCurrentTodolistStore();
	useEffect(() => {
		if (data?._id) {
			setTodoList(data);
		}
	}, [data, setTodoList]);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>{error.message}</p>;
	}

	if (!data) {
		return <p>No data</p>;
	}
	return (
		<>
			<TodoListCard />
			<NewTaskForm />
			<DeleteTodoListButton />
		</>
	);
};

export default TodoListDetailsLayout;
