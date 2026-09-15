import {test,expect} from "@playwright/test"

test ("Login Exitoso",async({page})=>{
await page.goto("https://practicesoftwaretesting.com/");//Ingresar a la pagina
await page.getByTestId("nav-sign-in").click();//click btn iniciar sesion
await page.getByTestId("email").fill("customer@practicesoftwaretesting.com"); //Add use
await page.getByTestId("password").fill("welcome01"); //Add pass
await page.getByTestId("login-submit").click();//click btn iniciar sesion
await expect (page.getByTestId("page-title")).toContainText ("My account");
});

test ("Login Fallido",async({page})=>{
await page.goto("https://practicesoftwaretesting.com/");//Ingresar a la pagina
await page.getByTestId("nav-sign-in").click();//click btn iniciar sesion
await page.getByTestId("email").fill("customer@practicesoftwaretesting.com"); //Add use
await page.getByTestId("password").fill("welcome0"); //Add pass
await page.getByTestId("login-submit").click();//click btn iniciar sesion

 // Validar mensaje de error
  const errorMessage = page.locator('[data-test="login-error"]'); 
  await expect(errorMessage).toHaveText("Invalid email or password");
});