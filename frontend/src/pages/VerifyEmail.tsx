import { leapfrog } from "ldrs";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useRef, useState } from "react";

const VerifyEmail = () => {
	const { showToast } = useContext(AppContext);
	const { verificationToken } = useParams<{ verificationToken: string }>();

	const [verificationStatus, setVerificationStatus] = useState<
		"pending" | "success" | "error"
	>("pending");

	useEffect(() => {
		leapfrog.register();
	}, []);

	const mutation = useMutation(apiClient.verifyEmail, {
		onSuccess: async (responseBody) => {
			showToast({ message: responseBody.message, type: "SUCCESS" });
			setVerificationStatus("success");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
			setVerificationStatus("error");
		},
	});

	const prevVerificationTokenRef = useRef<string | null>(null);

	useEffect(() => {
		if (
			verificationToken &&
			verificationToken !== prevVerificationTokenRef.current
		) {
			mutation.mutate(verificationToken);
			prevVerificationTokenRef.current = verificationToken;
		}
	}, [verificationToken, mutation]);

	return (
		<div className="container mx-auto max-w-xl">
			<div className="px-6 flex flex-col">
				{verificationStatus === "pending" && (
					<div className="my-14 flex gap-4 justify-center">
						<p className="text-lg font-bold text-primary">Verifying</p>
						<l-leapfrog
							size="40"
							speed="2.5"
							color="rgb(255, 125, 40)"></l-leapfrog>
					</div>
				)}
				{verificationStatus === "error" && (
					<div className="my-14 bg-background_alt p-6 rounded-lg">
						<h2 className="text-4xl font-extrabold tracking-tight text-med_orange">
							Verification Failed
						</h2>
						<p className="text-primary font-bold mt-2">
							Something went wrong while verifying your email. Please try again
							or request a new verification link.
						</p>
						<button
							onClick={() => mutation.mutate(verificationToken as string)}
							className="mt-4 bg-background text-primary font-semibold px-4 py-2 rounded hover:bg-med_orange transition-all">
							Retry Verification
						</button>
					</div>
				)}
				{verificationStatus === "success" && (
					<div className="my-14 bg-background_alt p-6 rounded-lg">
						<h2 className="text-4xl font-extrabold tracking-tight text-med_orange">
							Email Verified
						</h2>
						<p className="text-primary font-bold mt-1 mb-4">
							You can now login to your account.
						</p>
						<Link
							to="/sign-in"
							className="bg-background text-primary font-semibold px-4 py-2 rounded hover:bg-med_orange transition-all">
							Return to login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
