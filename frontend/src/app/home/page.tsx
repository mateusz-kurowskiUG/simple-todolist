"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import HomeLayout from "./_components/home-layout";

const Page = () => {
	const { status } = useSession({ required: true });

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return <HomeLayout />;
};

export default Page;
