import Footer from "../_components/footer";
import AdminNavBar from "./components/admin-navbar.tsx";
import SecondAdminNavbar from "./components/second-admin-navbar";

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
	return (
		<>
			<AdminNavBar />
			<SecondAdminNavbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
