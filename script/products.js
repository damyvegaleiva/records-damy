class Empanada {
  constructor(id, name, price, ingredients, stock, image, typeOfProduct) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
    this.stock = stock;
    this.image = image;
    this.typeOfProduct = typeOfProduct;
  }
}

const empanada01 = new Empanada(
  1,
  "Carne",
  4.99,
  "Ingredientes: Carne, huevo, morrones, aceitunas, cebolla.",
  20,
  "./images/sabores/empanadas-carne.png",
  "meat, todas"
);

const empanada02 = new Empanada(
  2,
  "Pollo",
  3.99,
  "Ingredientes: Pollo, huevo, cilantro, choclo.",
  20,
  "./images/sabores/empanadas-chicken.png",
  "meat, todas"
);

const empanada03 = new Empanada(
  3,
  "Espinaca",
  2.99,
  "Ingredientes: Espinaca, queso muzzarella.",
  20,
  "./images/sabores/empanadas-espinaca.png",
  "vegetarian, todas"
);

const empanada04 = new Empanada(
  4,
  "Choclo",
  2.50,
  "Ingredientes: Choclo y queso mozarella.",
  20,
  "./images/sabores/empanadas-mix.webp",
  "vegetarian, todas"
);

const misEmpanadas = [empanada01, empanada02, empanada03, empanada04];
