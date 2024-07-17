import { Resend } from "resend";

const resend = new Resend("re_JnX8i7sv_78B3Tnu6mMyvtPycGBgcZxHV");

type Params = {
	to: string;
	subject: string;
	text: string;
	html: string;
};

const getSender = () =>
	process.env.NODE_ENV === "development"
		? "onboarding@resend.dev"
		: "services@4331book.com";

const getReciever = (to: string) =>
	process.env.NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendEmail = async ({ to, subject, text, html }: Params) =>
	await resend.emails.send({
		from: getSender(),
		to: getReciever(to),
		subject,
		text,
		html,
	});
