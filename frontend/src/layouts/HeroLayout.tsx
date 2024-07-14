import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface Props {
	children: React.ReactNode;
}

const HeroLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			<Hero />
			<main className="flex-1 bg-background">{children}</main>
			<Footer />
		</>
	);
};

export default HeroLayout;
