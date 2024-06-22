import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React from "react";
import NewTodoListForm from "./new-todolist-form";

const NewTodoListDialog = () => {
	return (
		<>
			<Dialog>
				<DialogTrigger>Add a new Todolist now</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New Todolist</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						<NewTodoListForm />
					</DialogDescription>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default NewTodoListDialog;
