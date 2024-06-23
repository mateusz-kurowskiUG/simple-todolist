"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AuthMenu from "./auth-menu";
import { useRouter } from "next/navigation";

const AuthLayout = () => {
	const { status } = useSession();
	const router = useRouter();

	if (status === "authenticated") {
		router.push("/home");
	}
	if (status === "loading") {
		return <p>Loading...</p>;
	}
	return <AuthMenu />;
};

export default AuthLayout;
