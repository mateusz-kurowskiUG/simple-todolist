"use client";
import type React from "react";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";

const TodolistTable = ({ children }: { children: React.ReactNode }) => {
	return (
		<Table className="table-auto">
			<Thead>
				<Tr>
					<Th>Id</Th>
					<Th>User id</Th>
					<Th>Title</Th>
					<Th>Created</Th>
					<Th>Deadline</Th>
					{/* <Th>Action</Th> */}
				</Tr>
			</Thead>
			<Tbody>{children}</Tbody>
		</Table>
	);
};

export default TodolistTable;
