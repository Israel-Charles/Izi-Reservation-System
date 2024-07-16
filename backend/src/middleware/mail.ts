import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL as string,
		pass: process.env.PASSWORD as string,
	},
});

async function sendConfirmationEmail(
	email: string,
	userName: string,
	confirmationUrl: string
): Promise<void> {
	try {
		const info = await transporter.sendMail({
			from: {
				name: "4331booking.com",
				address: process.env.EMAIL as string,
			},
			to: email,
			subject: "Confirmation Email",
			text: `Hello ${userName},\n\nThank you for signing up! To complete your registration, please click the following link:\n\n${confirmationUrl}\n\nIf you did not sign up for My Website, please ignore this email.\n\nBest regards,\n4331booking.com Team`,
			html: `<h1>Hello ${userName},</h1><p>Thank you for signing up! To complete your registration, please click the following link:</p><a href="${confirmationUrl}">${confirmationUrl}</a><p>If you did not sign up for My Website, please ignore this email.</p><p>Best regards,</p><p>4331booking.com Team</p>`,
		});
		console.log(`Message sent: ${info.messageId}`);
	} catch (error) {
		console.error("Error sending email:", error);
	}
}

export default sendConfirmationEmail;
