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
	await page.locator("[name=password]").fill("test_password");
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByText("Sign in successful!")).toBeVisible();

	// navigate to my-resources page
	await page.goto(`${url}/my-resources`);
});

test("create new resource", async ({ page }) => {
	// get the add resource link
	await page.getByRole("link", { name: "Add Resource" }).click();

	// check if the add resource form is visible
	await expect(
		page.getByRole("heading", { name: "Add Resource" })
	).toBeVisible();

	// fill in the form with valid data
	await page.locator("[name=name]").fill("test_resource");
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
	// get the add resource link
	await page.getByRole("link", { name: "Add Resource" }).click();

	// check if the add resource form is visible
	await expect(
		page.getByRole("heading", { name: "Add Resource" })
	).toBeVisible();

	// fill in the form with invalid data (same name)
	await page.locator("[name=name]").fill("test_resource");
	await page.locator("[name=location]").fill("new location");
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
	await expect(
		page.getByText("Resource of this name already exists")
	).toBeVisible();
});

test("should display users resources", async ({ page }) => {
	// check if the users resources are visible
	await expect(page.getByText("My Resources")).toBeVisible();

	// get the resource data
	await expect(page.getByText("test_resource")).toBeVisible();
	await expect(page.getByText("test_location")).toBeVisible();
	await expect(page.getByText("Lorem ipsum dolor")).toBeVisible();
	await expect(page.getByText("Bar")).toBeVisible();
	await expect(page.getByText("120 minutes max")).toBeVisible();
	await expect(page.getByText("20 person(s) max")).toBeVisible();
	await expect(page.getByText("09:00 - 17:00")).toBeVisible();
});

test("should edit a resource", async ({ page }) => {
	// get the edit resource link
	await page.getByRole("link", { name: "Edit Resource" }).click();

	// check if the edit resource form is visible
	await expect(
		page.getByRole("heading", { name: "Edit Resource" })
	).toBeVisible();

	// fill in the form with updated data
	await page.waitForSelector('[name="name"]', { state: "attached" });
	await expect(page.locator('[name="name"]')).toHaveValue("test_resource");
	await page.locator('[name="location"]').fill("updated location");

	// get the save button
	await page.getByRole("button", { name: "Save" }).click();

	// check if the success message is visible
	await expect(page.getByText("Resource updated successfully!")).toBeVisible();

	// reload the page
	await page.reload();

	// check if the updated data is visible
	await expect(page.locator('[name="location"]')).toHaveValue(
		"updated location"
	);
});
