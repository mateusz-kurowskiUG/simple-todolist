import React, { useEffect } from "react";
import YourTodoLists from "./your-todolists";
import { useQuery } from "@tanstack/react-query";
import { getUserTodolists } from "../_queries/todolists-queries";
import { useSession } from "next-auth/react";
import { useUserTodolistsStore } from "../_stores/todolist-store";

const HomeLayout = () => {
	const { setTodolists } = useUserTodolistsStore();
	const { data: session } = useSession({ required: true });

	const { data, isLoading, error } = useQuery({
		queryKey: ["todolists"],
		queryFn: () => getUserTodolists(session.token),
	});

	useEffect(() => {
		if (data?.length) {
			setTodolists(data);
		}
	}, [data, setTodolists]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return <>
	<p>{process.env.NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_URL}</p>
	<YourTodoLists />
	</>
};

export default HomeLayout;
