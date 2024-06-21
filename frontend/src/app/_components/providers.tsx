"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const queryClient = new QueryClient();
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<SessionProvider>
					<QueryClientProvider client={queryClient}>
						{children}
						<ReactQueryDevtools />
					</QueryClientProvider>
				</SessionProvider>
			</ThemeProvider>
		</>
	);
};

export default Providers;
