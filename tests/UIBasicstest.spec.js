const {test, expect} = require('@playwright/test');


test('First Playwright Test', async ({browser})=>
{


const context =  await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
const passWord = page.locator("[type='password']");
const signIn = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.fill("rahulshetty");
await passWord.fill("Learning@830$3mK2");
await signIn.click();
console.log (await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");

await userName.fill("");
await userName.fill("rahulshettyacademy")
await signIn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
console.log(await cardTitles.allTextContents());

});

test('Second Playwright Test', async ({page})=>
{
await page.goto("https://google.com");
console.log (await page.title());

await expect(page).toHaveTitle("Google");
}

//testmayu@email.com
//Test12345

);

test('Assignment1 Playwright Test', async ({browser})=>
{
const context =  await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/client/");
console.log (await page.title());

const userName = page.locator("#userEmail");
const password = page.locator("#userPassword");
const signIn = page.locator("#login");

await userName.fill("testmayu@email.com");
await password.fill("Test12345");
await signIn.click();

await page.waitForLoadState('networkidle');
// below line give the strings, its not the locators, so we can use the first() method
const cardTitles = await page.locator(".card-body b").allTextContents();

// below one is the locator, so can use the first() or last()
const cardTitlesLocators = await page.locator(".card-body b");

console.log(cardTitles);
console.log(await cardTitlesLocators.first().textContent());
}

);

test ('UI controls test',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    
    await page.locator("#usertype").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator("#usertype").last().isChecked());
    await expect(page.locator("#usertype").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

}
);

test.only("child page control" ,async({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");

const [newPage]=await Promise.all(
[
 context.waitForEvent('page'),
 documentLink.click()
])

const text = await newPage.locator(".red").textContent();
console.log(text);
const arrayTest = text.split('@');
const domain = arrayTest[1].split(" ")[0];
console.log(domain);
await page.locator("#username").fill(domain);
await page.pause();
console.log(await page.locator("#username").inputValue());

}
);