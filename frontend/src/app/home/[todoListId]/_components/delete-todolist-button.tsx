import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
	useCurrentTodolistStore,
	useUserTodolistsStore,
} from "../../_stores/todolist-store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const DeleteTodoListButton = () => {
	const { data: session } = useSession({ required: true });
	const { todoList } = useCurrentTodolistStore();
	const { todoLists, setTodoLists } = useUserTodolistsStore();
	const { toast } = useToast();
	const router = useRouter();
	const [btnActive, setBtnActive] = useState<boolean>(true);
	const deleteTodoList = async () => {
		try {
			await axios
				.delete(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todolists/${todoList._id}`,
					{ headers: { Authorization: `Bearer ${session.token}` } },
				)
				.then((res) => res.data);
			setBtnActive(false);
			toast({
				title: "Deletion successful.",
				description: "Redirecting to home...",
			});
			setTodoLists(
				todoLists.filter((innerTodoList) => innerTodoList._id !== todoList._id),
			);
			setTimeout(() => {
				router.push("/home");
			}, 3000);
		} catch (e) {
			toast({
				title: "Deletion failed.",
				variant: "destructive",
			});
		}
	};

	return (
		<Button
			onClick={deleteTodoList}
			className="bg-red-600 text-white w-full hover:text-black"
			disabled={!btnActive}
		>
			Delete Todolist
		</Button>
	);
};

export default DeleteTodoListButton;
