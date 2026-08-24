import {test,expect} from "@playwright/test"

test ("Pagina de Inicio",async({page})=>{
await page.goto("https://practicesoftwaretesting.com/");//Ingresar a la pagina
await page.getByTestId("nav-sign-in").click();//click btn iniciar sesion
await page.getByTestId("email").fill("customer@practicesoftwaretesting.com"); //Add use
await page.getByTestId("password").fill("welcome01"); //Add pass
await page.getByTestId("login-submit").click();//click btn iniciar sesion
await page.getByTestId("nav-home").click();
await page.getByTestId("sort").selectOption({ label: "Name (A to Z)" });//Para click en btn de ordenar asd y desc

});