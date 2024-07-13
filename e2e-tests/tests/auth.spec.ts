import { test, expect } from "@playwright/test";

const url = "http://localhost:5173";

test("successful sign in with username", async ({ page }) => {
	// go to base url
	await page.goto(url);

	// get the sign in button
	await page.getByRole("link", { name: "Sign In" }).click();

	// check if the sign in form is visible
	await expect(page.getByRole("heading", { name: "Welcome Back." })).toBeVisible();

	// fill in the form with valid credentials
	await page.locator("[name=identifier]").fill("username");
	await page.locator("[name=password]").fill("password");

	// get the login button
	await page.getByRole("button", { name: "Login" }).click();

	// check if the success message is visible
	await expect(page.getByText("Sign in successful!")).toBeVisible();

	// check if the sign out button is visible
	await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("successful sign in with email", async ({ page }) => {
	// go to base url
	await page.goto(url);

	// get the sign in button
	await page.getByRole("link", { name: "Sign In" }).click();

	// check if the sign in form is visible
	await expect(page.getByRole("heading", { name: "Welcome Back." })).toBeVisible();

	// fill in the form with valid credentials
	await page.locator("[name=identifier]").fill("test@example.com");
	await page.locator("[name=password]").fill("password");

	// get the login button
	await page.getByRole("button", { name: "Login" }).click();

	// check if the success message is visible
	await expect(page.getByText("Sign in successful!")).toBeVisible();

	// check if the sign out button is visible
	await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("invalid credentials", async ({ page }) => {
	// go to base url
	await page.goto(url);

	// get the sign in button
	await page.getByRole("link", { name: "Sign In" }).click();

	// check if the sign in form is visible
	await expect(page.getByRole("heading", { name: "Welcome Back." })).toBeVisible();

	// fill in the form with invalid credentials
	await page.locator("[name=identifier]").fill("random");
	await page.locator("[name=password]").fill("random");

	// get the login button
	await page.getByRole("button", { name: "Login" }).click();

	// check if the success message is visible
	await expect(page.getByText("Invalid Credentials")).toBeVisible();
});

test("successful sign up", async ({ page }) => {
	// generate a random test username for the test user.
	const testUserName = `test_userName_${Math.floor(Math.random() * 90000) + 10000}`;

	// generate a random test email for the test user.
	const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`;

	// got to base url
	await page.goto(url);

	// get the register button
	await page.getByRole("link", { name: "Register" }).click();

	// check if the sign up form is visible
	await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible();

	// fill in the form with valid credentials
	await page.locator("[name=firstName]").fill("test_firstName");
	await page.locator("[name=lastName]").fill("test_lastName");
	await page.locator("[name=userName]").fill(testUserName);
	await page.locator("[name=email]").fill(testEmail);
	await page.locator("[name=password]").fill("test_password");
	await page.locator("[name=confirmPassword]").fill("test_password");

	// get the create account button
	await page.getByRole("button", { name: "Create Account" }).click();

	// check if the success message is visible
	await expect(page.getByText("Registration Successful!")).toBeVisible();

	// check if the sign out button is visible
	await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("prevent duplicate username", async ({ page }) => {
	// got to base url
	await page.goto(url);

	// get the register button
	await page.getByRole("link", { name: "Register" }).click();

	// check if the sign up form is visible
	await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible();

	// fill in the form with valid credentials
	await page.locator("[name=firstName]").fill("test_firstName");
	await page.locator("[name=lastName]").fill("test_lastName");
	await page.locator("[name=userName]").fill("username");
	await page.locator("[name=email]").fill("new@email.com");
	await page.locator("[name=password]").fill("test_password");
	await page.locator("[name=confirmPassword]").fill("test_password");

	// get the create account button
	await page.getByRole("button", { name: "Create Account" }).click();

	// check if the success message is visible
	await expect(page.getByText("username is taken")).toBeVisible();
});

test("prevent duplicate email", async ({ page }) => {
	// got to base url
	await page.goto(url);

	// get the register button
	await page.getByRole("link", { name: "Register" }).click();

	// check if the sign up form is visible
	await expect(page.getByRole("heading", { name: "Create an account" })).toBeVisible();

	// fill in the form with valid credentials
	await page.locator("[name=firstName]").fill("test_firstName");
	await page.locator("[name=lastName]").fill("test_lastName");
	await page.locator("[name=userName]").fill("new_username");
	await page.locator("[name=email]").fill("test@example.com");
	await page.locator("[name=password]").fill("test_password");
	await page.locator("[name=confirmPassword]").fill("test_password");

	// get the create account button
	await page.getByRole("button", { name: "Create Account" }).click();

	// check if the success message is visible
	await expect(page.getByText("Email belongs to an existing account")).toBeVisible();
});
