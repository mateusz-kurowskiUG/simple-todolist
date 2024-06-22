"use client";
import type ITodoList from "@/app/interfaces/ITodoList";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTodoListById } from "../../queries/admin-todolists";
import { useSession } from "next-auth/react";
import type ICustomSession from "@/interfaces/ICustomSession";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { todolistId: string } }) => {
	const { toast } = useToast();
	const router = useRouter();
	const { data: session } = useSession({
		required: true,
	}) as unknown as ICustomSession;
	const { data, isLoading, error } = useQuery<ITodoList>({
		queryKey: ["todolist"],
		queryFn: () => getTodoListById(params.todolistId, session.token),
	});
	if (isLoading) { return <p>Loading...</p>; }
	if (error) { return <p>{error.message}</p>; }

	const deleteItem = async (id: string, accessToken: string) => {
		try {
			await axios.delete(`http://localhost:5000/api/admin/todolists/${id}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			toast({
				title: "Delete successfull\nRedirecting to todolists in 5 seconds...",
			});
			setTimeout(() => {
				router.push("/admin/todolists");
			}, 5000);
		} catch (e) {
			toast({
				title: "Delete Failed",
			});
		}
	};
	if (!data) {
		return (
			<>
				<div className="text-center text-2xl">
					<p>Todolist not found</p>
					<Link className="text-blue-600" href="../">
						Go back.
					</Link>
				</div>
			</>
		);
	}

	return (
		<div className="p-4 space-y-5">
			<div className="text-center text-xl">Todolist id: {data._id}</div>
			<div className="flex justify-between">
				<div>Creation time:</div>
				<div>{data.createdAt}</div>
			</div>
			<div className="flex justify-between">
				<div>Deadline:</div>
				<div>{data.deadline}</div>
			</div>
			<div className="flex justify-between">
				<div>Title:</div>
				<div>{data.title}</div>
			</div>
			<div className="flex justify-between">
				<div>User id:</div>
				<div>
					<Link className="text-blue-600" href={`/admin/users/${data.userId}`}>
						{data.userId}
					</Link>
				</div>
			</div>
			<div className="flex justify-between">
				<div>Action:</div>
				<div>
					<Button
						onClick={() => deleteItem(data._id, session.token)}
						className="bg-red-700"
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page;
