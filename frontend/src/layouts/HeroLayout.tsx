import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface Props {
	children: React.ReactNode;
}

const HeroLayout = ({ children }: Props) => {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<Header />
			<Hero />
			<div className="mx-auto py-10 flex-1">{children}</div>
			<Footer />
		</div>
	);
};

export default HeroLayout;
