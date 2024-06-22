import React from "react";
import TodoListDetailsLayout from "./_components/todolist-details-layout";

const Page = ({
	params: { todoListId },
}: { params: { todoListId: string } }) => {
	return <TodoListDetailsLayout todoListId={todoListId} />;
};

export default Page;
