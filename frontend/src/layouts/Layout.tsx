import Footer from "../components/Footer";
import Header from "../components/Navbar";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<main className="flex-1 bg-background">{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
