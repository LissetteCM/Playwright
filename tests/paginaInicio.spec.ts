import {test,expect} from "@playwright/test"

test ("Pagina de Inicio",async({page})=>{
await page.goto("https://practicesoftwaretesting.com/");//Ingresar a la pagina
await page.getByTestId("nav-sign-in").click();//click btn iniciar sesion
await page.getByTestId("email").fill("customer@practicesoftwaretesting.com"); //Add use
await page.getByTestId("password").fill("welcome01"); //Add pass
await page.getByTestId("login-submit").click();//click btn iniciar sesion
await page.getByTestId("nav-home").click();


//Validar que si se haya ordenado correctamente
const elements =  page.getByTestId("product-name");
await expect(elements.first()).not.toHaveText('');
const productNames = await elements.first().innerText();
console.log(productNames);

await page.getByTestId("sort").selectOption({ label :'Name (A - Z)' });//Para click en btn de ordenar asd y desc

const items = page.getByTestId("product-name");
await expect(items.first()).not.toHaveText(productNames);
const ProductNames = await items.allTextContents();
console.log(ProductNames);

const getTexts = (await items.allTextContents()).map((text) => text.trim());

const expectedTexts = [...getTexts].sort((a, b) => a.localeCompare(b));

expect(getTexts).toEqual(expectedTexts);
});