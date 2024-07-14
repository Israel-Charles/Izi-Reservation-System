import { test, expect } from "@playwright/test";
import path from "path";

const url = "http://localhost:5173";

// sign in before each test
test.beforeEach(async ({ page }) => {
	await page.goto(url);
	await page.getByRole("link", { name: "Sign In" }).click();
	await expect(
		page.getByRole("heading", { name: "Welcome Back." })
	).toBeVisible();
	await page.locator("[name=identifier]").fill("username");
	await page.locator("[name=password]").fill("password");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByText("Sign in successful!")).toBeVisible();

	// navigate to the add resource page
	await page.goto(`${url}/add-resource`);
});

test("create new resource", async ({ page }) => {
	// create a test name for the resource
	const testName = `test_resource_${Math.floor(Math.random() * 90000) + 10000}`;

	// fill in the form with valid data
	await page.locator("[name=name]").fill(testName);
	await page.locator("[name=location]").fill("test_location");
	await page
		.locator("[name=description]")
		.fill(
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed nisi lacus sed viverra. Gravida quis blandit turpicursus in hac habitasse. Sed viverra ipsum nunc aliquet bibendum. Ut consequat semper viverra nam libero justo laoreet. Vivamus arcu felis bibendum ut tristique et egestas quis. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Odio facilisis mauris sit amet massa vitae. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Nibhnisl condimentum id venenatis a condimentum. Pharetra diam sit amet nisl suscipit. Quisque egestas diam in arcu cursus euismod quis. Dignissim suspendisse in est ante. Purus sit ametluctus venenatis lectus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. Posuere morbi leo urna molestieat elementum. Nascetur ridiculus mus mauris vitae ultricies."
		);
	await page.locator("[name=maxResLen]").fill("120");
	await page.locator("[name=maxResSize]").fill("20");
	await page.getByText("Bar").click();
	await page.locator("[name=open]").fill("09:00");
	await page.locator("[name=close]").fill("17:00");
	await page.getByLabel("Monday").check();
	await page.getByLabel("Tuesday").check();
	await page.getByLabel("Wednesday").check();
	await page.setInputFiles('[name="imageFiles"]', [
		path.join(__dirname, "files", "machine1.jpg"),
		path.join(__dirname, "files", "machine2.jpg"),
		path.join(__dirname, "files", "machine3.jpg"),
	]);

	// get the save button
	await page.getByRole("button", { name: "Save" }).click();

	// check if the success message is visible
	await expect(page.getByText("Resource added successfully!")).toBeVisible();
});

test("invalid resource form", async ({ page }) => {
	// fill in the form with invalid data (same name)
	await page.locator("[name=name]").fill("test resource");
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
	await page.setInputFiles('[name="imageFiles"]', [
		path.join(__dirname, "files", "machine1.jpg"),
		path.join(__dirname, "files", "machine2.jpg"),
		path.join(__dirname, "files", "machine3.jpg"),
	]);

	// get the save button
	await page.getByRole("button", { name: "Save" }).click();

	// check if the success message is visible
	await expect(page.getByText("Error adding resource")).toBeVisible();
});

test("should display users resources", async ({ page }) => {
	// navigate to the resources page
	await page.goto(`${url}/my-resources`);

	// get the resource data
	await expect(page.getByText("test resource")).toBeVisible();
	await expect(page.getByText("test location")).toBeVisible();
	await expect(page.getByText("test description")).toBeVisible();
	await expect(page.getByText("Restaurant")).toBeVisible();
	await expect(page.getByText("30 minutes max")).toBeVisible();
	await expect(page.getByText("3 person(s) max")).toBeVisible();
	await expect(page.getByText("11:00 - 12:00")).toBeVisible();

	// get the view details and add resource links
	// await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Add Resource" })).toBeVisible();
});
