import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
    children: React.ReactNode;
}

const HeroLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <Hero />
            <SearchBar />
            <main className="flex-1 bg-background">{children}</main>
            <Footer />
        </>
    );
};

export default HeroLayout;
