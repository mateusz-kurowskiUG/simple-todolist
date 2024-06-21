"use client";
import { SessionProvider, useSession } from "next-auth/react";
import AuthLayout from "./_components/auth-layout";
import { useRouter } from "next/navigation";
export default function Home() {
	return (
		<>
				<AuthLayout />
		</>
	);
}
