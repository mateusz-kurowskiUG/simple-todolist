"use client";
import React, { useState } from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import RegisterForm from "./register-form";
import KeycloakLoginButton from "./keycloak-login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthMenu = () => {
	return (
		<>
			<NavBar />
			<Tabs defaultValue="signin" className="w-full">
				<TabsList className="w-full justify-evenly">
					<TabsTrigger value="signin">Sign in</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<p className="text-center">Sign in using one of providers below:</p>
					<div className="m-6 p-2 ">
						<KeycloakLoginButton />
					</div>
				</TabsContent>
			</Tabs>
			<Footer />
		</>
	);
};

export default AuthMenu;
