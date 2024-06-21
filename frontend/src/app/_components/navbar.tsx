"use client";
import React, { useContext } from "react";
import Image from "next/image";
import logo from "../../tmdb-logo.svg";
import { useSession } from "next-auth/react";
import Logout from "./logout";
import { ModeToggle } from "@/components/mode-toggle";
function NavBar() {
	const { status } = useSession();
	return (
		<div className="flex justify-between p-2">
			<div className="logo text-2xl font-bold">
				<a href="/">Simple logo</a>
			</div>
			<div>
				<ModeToggle />
				{status === "authenticated" ? <Logout /> : null}
			</div>
		</div>
	);
}

export default NavBar;
