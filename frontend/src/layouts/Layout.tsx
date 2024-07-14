import Footer from "../components/Footer";
import Header from "../components/Header";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
