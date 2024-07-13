import { test, expect } from "@playwright/test";
import path from "path";

const url = "http://localhost:5173";

// sign in before each test
test.beforeEach(async ({ page }) => {
	await page.goto(url);
	await page.getByRole("link", { name: "Sign In" }).click();
	await expect(page.getByRole("heading", { name: "Welcome Back." })).toBeVisible();
	await page.locator("[name=identifier]").fill("username");
	await page.locator("[name=password]").fill("password");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByText("Sign in successful!")).toBeVisible();

	// navigate to the add resource page
	await page.goto(`${url}/add-resource`);
});

test("create new resource", async ({ page }) => {
	// fill in the form with valid data
	await page.locator("[name=name]").fill("Test Resource");
	await page.locator("[name=location]").fill("Test Location");
	await page.locator("[name=description]").fill("This is a test resource.");
	await page.locator("[name=maxResLen]").fill("120");
	await page.locator("[name=maxResSize]").fill("20");
	await page.getByText("Bar").click();
	await page.locator("[name=open]").fill("09:00");
	await page.locator("[name=close]").fill("17:00");
	await page.getByLabel("Monday").check();
	await page.getByLabel("Tuesday").check();
	await page.getByLabel("Wednesday").check();
	await page.setInputFiles('[name="imageFiles"]', [path.join(__dirname, "files", "machine1.jpg"), path.join(__dirname, "files", "machine2.jpg"), path.join(__dirname, "files", "machine3.jpg")]);

	// get the save button
	await page.getByRole("button", { name: "Save" }).click();

	// check if the success message is visible
	await expect(page.getByText("Resource added successfully!")).toBeVisible();
});

test("invalid resource form", async ({ page }) => {
	// fill in the form with invalid data (same name)
	await page.locator("[name=name]").fill("Test Resource");
	await page.locator("[name=location]").fill("Test Location");
	await page.locator("[name=description]").fill("This is a test resource.");
	await page.locator("[name=maxResLen]").fill("120");
	await page.locator("[name=maxResSize]").fill("20");
	await page.getByText("Bar").click();
	await page.locator("[name=open]").fill("09:00");
	await page.locator("[name=close]").fill("17:00");
	await page.getByLabel("Monday").check();
	await page.getByLabel("Tuesday").check();
	await page.getByLabel("Wednesday").check();
	await page.setInputFiles('[name="imageFiles"]', [path.join(__dirname, "files", "machine1.jpg"), path.join(__dirname, "files", "machine2.jpg"), path.join(__dirname, "files", "machine3.jpg")]);

	// get the save button
	await page.getByRole("button", { name: "Save" }).click();

	// check if the success message is visible
	await expect(page.getByText("Error adding resource")).toBeVisible();
});

test("should display users resources", async ({ page }) => {
	// navigate to the resources page
	await page.goto(`${url}/my-resources`);

	// get the resource data
	await expect(page.getByText("Test Resource")).toBeVisible();
	await expect(page.getByText("This is a test description")).toBeVisible();
	await expect(page.getByText("Test Location")).toBeVisible();
	await expect(page.getByText("Bar")).toBeVisible();
	await expect(page.getByText("120 minutes max")).toBeVisible();
	await expect(page.getByText("20 person(s) max")).toBeVisible();
	await expect(page.getByText("09:00 - 17:00")).toBeVisible();

	// get the view details and add resource links
	await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Add Resource" })).toBeVisible();
});
