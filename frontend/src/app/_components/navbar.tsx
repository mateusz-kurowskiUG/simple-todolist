"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Logout from "./logout";
import { ModeToggle } from "@/components/mode-toggle";
function NavBar() {
	const { status, data: session } = useSession();

	// const {
	// 	user: { roles },
	// } = session;
	// console.log(roles);

	return (
		<div className="flex justify-between p-2">
			<div className="logo text-2xl font-bold">
				<div className="flex flex-col">
					<a
						className="hover:text-blue-600"
						href={status === "authenticated" ? "/home" : "/"}
					>
						User Mode
					</a>
					{session?.user.roles.find((role) => role === "admin") ? (
						<div className="italic text-xl">
							<a className="hover:text-blue-600" href="/admin">
								Admin Panel
							</a>
						</div>
					) : null}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<ModeToggle />
				{status === "authenticated" ? <Logout /> : null}
			</div>
		</div>
	);
}

export default NavBar;
