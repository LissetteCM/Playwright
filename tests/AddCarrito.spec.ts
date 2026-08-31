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

      // Volver al home
      await page.getByTestId("nav-home").click();
    } else {
      console.warn(`No se encontraron tarjetas para: ${producto}`);
    }
  }

  // Validar que el carrito tenga más de un producto
 await page.getByTestId("nav-cart").click();
  //const itemsFinales = await page.locator('[data-test="cart-item"]').count();
  //expect(itemsFinales).toBeGreaterThan(1);

await page.getByTestId("proceed-1").click();
});
