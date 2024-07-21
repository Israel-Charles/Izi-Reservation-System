import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Welcome from "../components/Welcome";
import SearchBar from "../components/SearchBar";


interface Props {
	children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<Welcome />
			<SearchBar />
			<main className="flex-1 bg-background">{children}</main>
			<Footer />
		</>
	);
};

export default DashboardLayout;
