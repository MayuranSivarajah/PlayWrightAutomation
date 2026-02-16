const {test, expect} = require('@playwright/test');

test('Assignment1 Playwright Test', async ({browser})=>
{
const context =  await browser.newContext();
const page = await context.newPage();
const productName = "ZARA COAT 3";

const products = page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/");
console.log (await page.title());

const userName = page.locator("#userEmail");
const password = page.locator("#userPassword");
const signIn = page.locator("#login");

await userName.fill("testmayu@email.com");
await password.fill("Test12345");
await signIn.click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
// below line give the strings, its not the locators, so we can use the first() method
const cardTitles = await page.locator(".card-body b").allTextContents();

// below one is the locator, so can use the first() or last()
const cardTitlesLocators = await page.locator(".card-body b");

console.log(cardTitles);
console.log(await cardTitlesLocators.first().textContent());

const counts = await products.count();
for (let i =0; i<counts; i++){
    if (await products.nth(i).locator("b").textContent() === productName)
    {
        await products.nth(i).locator("text = Add To Cart ").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();

//page.locator("h3:has-text('ZARA COAT 3')").waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();

await page.locator("text=Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for (let i=0; i<optionsCount; i++){
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.includes("India")){
        await dropdown.locator("button").nth(i).click();
        break;
    }
}
await page.pause();
}
);