"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import type ITodoList from "@/app/interfaces/ITodoList";
import { useCurrentTodolistStore } from "../../_stores/todolist-store";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const formSchema = z.object({
	task: z.string().min(2, {
		message: "New task content must be at least 2 characters.",
	}),
});

export default function NewTaskForm() {
	const { data: session } = useSession({ required: true });
	const { todoList, setTodoList } = useCurrentTodolistStore();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			task: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit({ task }: z.infer<typeof formSchema>) {
		try {
			const newTodoList = await axios
				.post<ITodoList>(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todolists/${todoList._id}`,
					{ task },
					{ headers: { Authorization: `Bearer ${session.token}` } },
				)
				.then((res) => res.data);
			console.log(newTodoList);

			setTodoList(newTodoList);
		} catch (e) {}
	}
	return (
		<div className="w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 flex w-full justify-center p-2"
				>
					<FormField
						control={form.control}
						name="task"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>New Task</FormLabel>
								<FormControl>
									<Input placeholder="new task!" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="hover:bg-green-600 hover:text-white bg-blue-600 text-black"
					>
						<Plus />
					</Button>
				</form>
			</Form>
		</div>
	);
}
