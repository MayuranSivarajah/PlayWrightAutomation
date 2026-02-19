const {test, expect} = require('@playwright/test');

test('Assignment1 Playwright Test', async ({browser})=>
{
const context =  await browser.newContext();
const page = await context.newPage();
const productName = "ZARA COAT 3";

const products = page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill("testmayu@email.com");
await page.getByPlaceholder("enter your passsword").fill("Test12345");
await page.getByRole("button", {name:"Login"}).click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
// below line give the strings, its not the locators, so we can use the first() method
 await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:"Add To Cart"}).click();

await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();

await page.locator("div li").first().waitFor();
await expect (page.getByText("ZARA COAT 3")).toBeVisible();
await page.getByRole("button", {name:"Checkout"}).click();

await page.getByPlaceholder("Select Country").pressSequentially("ind");

await page.getByRole("button",{name:"India"}).nth(1).click();
await page.getByText("PLACE ORDER").click();

await expect(page.getByText("Thankyou for the order.")).toBeVisible();
}
);