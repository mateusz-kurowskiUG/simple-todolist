import ITask from "@/app/interfaces/ITask";
import type ITodoList from "@/app/interfaces/ITodoList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Tr, Td } from "react-super-responsive-table";
const reverseDate = (date: string) =>
	new Date(date).toISOString().slice(0, 10).split("-").reverse().join("-");

const TodoListItem = ({
	todolist: { createdAt, deadline, title, userId, _id },
}: { todolist: ITodoList }) => {
	const creationDate = reverseDate(createdAt);
	const deadlineDate = reverseDate(deadline);
	return (
		<Tr className="flex-col df-full">
			<Td>
				<Link href={`./todolists/${_id}`}>
					<span className="text-blue-600">...{_id.slice(-6)}</span>
				</Link>
			</Td>
			<Td>...{userId.slice(-6)}</Td>
			<Td>{title}</Td>
			<Td>{creationDate}</Td>
			<Td>{deadlineDate}</Td>
			{/* <Td>
				<Button>Delete</Button>
			</Td> */}
		</Tr>
	);
};

export default TodoListItem;
