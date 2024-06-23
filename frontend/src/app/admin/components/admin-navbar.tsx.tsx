"use client";
import Logout from "@/app/_components/logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import React from "react";

const AdminNavBar = () => {
	return (
		<>
			<div className="flex p-2 justify-between">
				<div className="left flex gap-2">
					<div className="logo text-2xl flex-col">
						<div>
							<Link className="hover:text-bg-blue-600" href="/admin">
								Admin Panel
							</Link>
						</div>
						<div>
							<Link
								className="italic text-xl hover:text-bg-blue-600"
								href="/home"
							>
								User Mode
							</Link>
						</div>
					</div>
				</div>

				<div className="right flex gap-2">
					<ModeToggle />
					<Logout />
				</div>
			</div>
		</>
	);
};

export default AdminNavBar;
