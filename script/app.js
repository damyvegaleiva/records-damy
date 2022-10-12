function saludar(usuario) {
  return console.log(`Hola ${usuario}`);
}

function realizarPedido() {
  let nombre = prompt("Bienvenido/a a Milonga. Cual es tu nombre?");

  saludar(nombre);

  let cantidadEmpanadas = parseInt(
    prompt("Ingresa la cantidad de empanadas a comprar: ")
  );

  if (parseInt(cantidadEmpanadas) === 1) {
    console.log(`Tu orden es de ${cantidadEmpanadas} empanada.`);
  } else if (parseInt(cantidadEmpanadas)) {
    console.log(`Tu orden es de ${cantidadEmpanadas} empanadas.`);
  } else {
    while (!parseInt(cantidadEmpanadas)) {
      cantidadEmpanadas = parseInt(
        prompt(
          "Debes ingresar un numero valido. Vuelve a ingresar el numero de empanadas que queres comprar."
        )
      );
    }
    if (parseInt(cantidadEmpanadas) === 1) {
      console.log(`Tu orden es de ${cantidadEmpanadas} empanada.`);
    } else {
      console.log(`Tu orden es de ${cantidadEmpanadas} empanadas.`);
    }
  }

  let precioEmpanadas = cantidadEmpanadas * 3;
  const ENVIO = precioEmpanadas * 0.15;
  let precioTotal = precioEmpanadas + ENVIO;

  alert(
    `El costo de ENVIO de tu pedido es de un 15%($${ENVIO}) de tu total. El precio total de tu pedido es de $${precioTotal}`
  );
  console.log(`El costo de tu pedido es de $${precioTotal}.`);

  for (cantidadEmpanadas; cantidadEmpanadas > 0; cantidadEmpanadas--) {
    let gusto = prompt("Ingresa el sabor a agregar (Carne, Pollo, Espinaca):");
    if (
      gusto.toLowerCase() === "carne" ||
      gusto.toLowerCase() === "pollo" ||
      gusto.toLowerCase() === "espinaca"
    ) {
      console.log(gusto);
    } else {
      while (
        gusto.toLowerCase() != "carne" &&
        gusto.toLowerCase() != "pollo" &&
        gusto.toLowerCase() != "espinaca"
      ) {
        gusto = prompt(
          "Elegir un sabor disponible. Ingresa el sabor a agregar (Carne, Pollo, Espinaca):"
        );
      }
      console.log(gusto);
    }
  }

  alert(`TU PEDIDO HA SIDO ENVIADO. MUCHAS GRACIAS!`);
}

function crearSaboresEmpanadas() {
  empanadas.forEach((empanada) => {
    saboresEl.innerHTML += `
    <article class="col-sm-12 col-md-6 col-lg-3">
          <img src="${empanada.imgSrc}" alt="" class="w-100 img-thumbnail">
          <h2 class="empanadas-sabores">${empanada.nombre}</h2>
          <p>${empanada.ingredientes}</p>
          <div class="options">
            <h5>$${empanada.precio}</h5>
            <button class="btn btn-bg__color mb-2 w-100" >Agregar</button>
          </div>
        </article>
    `;
  });
}

alert(
  'Abrir "console" antes de empezar tu pedido. Para realizar tu pedido hace click en "HACER PEDIDO".'
);

let startPedido = document.getElementById("startPedido");
startPedido.onclick = realizarPedido;

const saboresEl = document.querySelector(".row-sabores");
crearSaboresEmpanadas();

let cart = [];
