import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import SearchBar from "../components/SearchBar";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

interface Props {
    children: React.ReactNode;
}

const HeroLayout = ({ children }: Props) => {
    const { isLoggedIn } = useContext(AppContext);

    return (
        <>
            <Header />
            {isLoggedIn ? <Welcome /> : <Hero />}
            <SearchBar />
            <main className="flex-1 bg-background">{children}</main>
            <Footer />
        </>
    );
};

export default HeroLayout;
