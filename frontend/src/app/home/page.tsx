"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import HomeLayout from "./_components/home-layout";

const Page = () => {
	const { data: session, status } = useSession({ required: true });

	const router = useRouter();

	if (status === "loading") return <p>Loading...</p>;
	// todo: remove this vvvv
	if (status === "unauthenticated") router.push("/");

	return <HomeLayout />;
};

export default Page;
