const About = () => {
    return (
        <div className="p-6 container mx-auto">
            <div className="p-6 rounded-lg my-14 bg-background_alt shadow-lg">
                <span className="text-3xl font-bond text-primary">
                    About Us
                </span>
                <p className="font-semibold text-primary">
                    <br></br>
                    Welcome to 4331Booking, a versatile scheduling software
                    designed to streamline the reservation process for
                    resources. Our software aims to enhance resource management
                    by providing an intuitive interface for users to book, view,
                    and manage reservations efficiently.
                </p>
                <p className="font-semibold text-primary">
                    <br></br>
                    Project Contributors:
                </p>
                <ul className="font-semibold text-primary list-disc pl-10">
                    <li>Alamoudi, Faris</li>
                    <li>Charles, Israel</li>
                    <li>Chengalasetty, Eswanth Sriram</li>
                    <li>Devireddy, Mahica</li>
                    <li>Hagler, Jeremy</li>
                    <li>Mathew, Milan</li>
                    <li>Sane, Keating</li>
                </ul>
                <p className="font-semibold text-primary">
                    <br></br>
                    Our goal is to provide a seamless and efficient booking
                    experience, helping users optimize the use of their
                    resources and improve productivity.
                </p>
            </div>
        </div>
    );
};

export default About;
