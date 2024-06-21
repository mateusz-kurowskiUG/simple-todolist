"use client";
import type ITodoList from "@/app/interfaces/ITodoList";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { getTodolists } from "../queries/admin-todolists";
import type ICustomSession from "@/interfaces/ICustomSession";
import TodoListItem from "./_components/todolist-item";
import { createId } from "@paralleldrive/cuid2";
import TodolistTable from "./_components/todolist-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Page = () => {
	const { data: session } = useSession({ required: true }) as unknown as {
		data: ICustomSession;
	};
	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery<ITodoList[]>({
		queryKey: ["todolists"],
		queryFn: () => getTodolists(session.token),
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return error.message;
	if (!queryData) return "no data";
	return (
		<div className="w-full">
			<TodolistTable>
				{queryData.map((todolist) => (
					<TodoListItem todolist={todolist} key={createId()} />
				))}
			</TodolistTable>
		</div>
	);
};

export default Page;
