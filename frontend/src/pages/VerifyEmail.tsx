import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const VerifyEmail = () => {
	const { showToast } = useAppContext();
	const { verificationToken } = useParams<{ verificationToken: string }>();

	const [verificationStatus, setVerificationStatus] = useState<
		"pending" | "success" | "error"
	>("pending");

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
					<div className="my-14 flex justify-center">
						<p className="text-lg font-bold text-primary">Verifying...</p>
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
						<p className="text-primary font-bold mt-2">
							Your email address has been successfully verified. You can now
							login to your account.
						</p>
						<Link
							to="/sign-in"
							className="block mt-4 text-link hover:text-link_hover hover:underline transition-all">
							Return to login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
