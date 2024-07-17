import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Params = {
	to: string;
	subject: string;
	text: string;
	html: string;
};

const getSender = () =>
	process.env.NODE_ENV === "development"
		? "onboarding@resend.dev"
		: (process.env.EMAIL_SENDER as string);

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
