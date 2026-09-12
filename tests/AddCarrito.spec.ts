import { test, expect } from "@playwright/test";

test("Carrito de Compras con múltiples productos", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("welcome01");
  await page.getByTestId("login-submit").click();
  await page.getByTestId("nav-home").click();

  const productos = ["Pliers", "Screwdriver", "Drill"];
  let itemsPrevios = 0;

  for (const producto of productos) {
    await page.getByTestId("search-query").fill(producto);
    await page.getByTestId("search-submit").click();

    const tarjetas = page.locator('a.card');
    const tarjetaCount = await tarjetas.count();

    if (tarjetaCount > 0) {
      await tarjetas.first().click();

      // Esperar botón de añadir
      await page.waitForSelector('[data-test="add-to-cart"]', { timeout: 5000 });
      await page.getByTestId("add-to-cart").click();

      // Ir al carrito y validar incremento
      await page.getByTestId("nav-cart").click();
      const itemsEnCarrito = await page.locator('[data-test="cart-item"]').count();
      //expect(itemsEnCarrito).toBeGreaterThan(itemsPrevios);
      //itemsPrevios = itemsEnCarrito;
//await page.screenshot({path: 'screenshots/Carrito/Carrito1.png', fullPage: true});//captura de pantalla

      // Volver al home
      await page.getByTestId("nav-home").click();
    } else {
      console.warn(`No se encontraron tarjetas para: ${producto}`);
    }
  }
//await page.screenshot({path: 'screenshots/Carrito/Carrito.png', fullPage: true});//captura de pantalla

await page.waitForSelector('[data-test="nav-cart"]', { timeout: 60000 });
await page.getByTestId("nav-cart").click();
await page.getByTestId("proceed-1").click();

// Sign in
 await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("welcome01");
  await page.getByTestId("login-submit").click();
 // await page.waitForTimeout(1000);
  await page.getByTestId("proceed-2").click();
  // Biññimg Address
  await page.getByTestId("country").selectOption({ label :'American Samoa' });
   await page.getByTestId("postal_code").fill("30510");
   await page.getByTestId("house_number").fill("8836-0616");
   await page.getByTestId("street").fill("Jessica Dam");
   await page.getByTestId("city").fill("Feeneyberg");
   await page.getByTestId("state").fill("Colorado");
    await page.getByTestId("proceed-3").click();
 // await page.waitForTimeout(1000);

  // Payment
   await page.getByTestId("payment-method").selectOption({ label :'Credit Card' });
  await page.getByTestId("credit_card_number").fill("4111-1111-1111-1111");
  await page.getByTestId("expiration_date").fill("12/2030");
  await page.getByTestId("cvv").fill("123");
  await page.getByTestId("card_holder_name").fill("Lissette Contreras");
  await page.getByTestId("finish").click();
  await page.waitForTimeout(3000);
   await page.pdf({
        path: 'screenshots/Carrito/Compra_Finalizada2.pdf',
        format: 'A4',
        printBackground: true, // Incluye fondos y colores CSS
        landscape: true, // <-- Configura la orientación a Horizontal (Landscape)
        margin: {
            top: '20mm',
            bottom: '20mm',
            left: '15mm',
            right: '15mm',
        },
        displayHeaderFooter: true,
        headerTemplate: '<span style="font-size:10px; margin-left: 20px;">Documento generado con - Playwright - Testing con Pablo Herrera</span>',
        footerTemplate: '<span style="font-size:10px; margin-left: 20px;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>',
    });
});
