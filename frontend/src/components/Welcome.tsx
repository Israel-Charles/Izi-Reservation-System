import "animate.css";

const Welcome = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const firstName = user ? user.firstName : "";
    const lastName = user ? user.lastName : "";

    return (
        <div className="z-10 bg-background_alt pb-16 shadow-lg">
            <div className="container mx-auto gap-2 mt-8 px-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold tracking-tight animate__animated animate__bounce">
                    Welcome,
                    <span className="bg-gradient-to-r from-dark_orange to-light_orange text-transparent bg-clip-text font-bold italic p-1 animate__animated animate__bounce">
                        {" " + firstName + " " + lastName}
                    </span>
                </h2>
                <p className="mt-2 md:text-lg lg:text-xl text-secondary">
                    Looking to Reserve Something?
                </p>
            </div>
        </div>
    );
};

export default Welcome;
