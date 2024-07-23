import imageFront from "../../images/HomePic3.png";
import imageBack from "../../images/HomePic4.png";

const Home = () => {
    return (
        <div className="container mx-auto px-6 mt-10 mb-10 flex flex-wrap justify-between">
            <div className="text-primary mb-10 flex flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                <h2 className="mb-4 text-5xl font-bold sm:text-6xl md:mb-8">
                    Plan Ahead! Reserve Now!
                </h2>
                <p className="mb-4 md:mb-8 text-2xl font-semibold">
                    Manage your reservations tools with 4331Booking for Peace of
                    mind
                </p>
                <p className="max-w-md leading-relaxed xl:text-lg italic">
                    * Available on all Platforms *
                </p>
            </div>
            <div className="mb-12 flex w-full md:mb-16 lg:mt-5 lg:w-2/3 ">
                <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg md:left-16 md:top-16 lg:ml-0">
                    <img
                        src={imageBack}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={imageFront}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
