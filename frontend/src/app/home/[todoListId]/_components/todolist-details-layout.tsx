"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { getTodoListById } from "../../_queries/todolists-queries";
import TodoListCard from "./todolist-card";

const TodoListDetailsLayout = ({ todoListId }: { todoListId: string }) => {
	const { data: session } = useSession({ required: true });
	const { data, isLoading, error } = useQuery({
		queryKey: ["todoList"],
		queryFn: () => getTodoListById(todoListId, session.token),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>{error.message}</p>;
	}

	if (!data) {
		return <p>No data</p>;
	}

	return <TodoListCard todoList={data} />;
};

export default TodoListDetailsLayout;
