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
    let gusto = prompt("Ingresa el sabor a agregar (Carne, Pollo, Fileteada):");
    if (gusto == "Carne" || gusto == "Pollo" || gusto == "Fileteada") {
      console.log(gusto);
    } else {
      while (gusto != "Carne" && gusto != "Pollo" && gusto != "Fileteada") {
        gusto = prompt(
          "Elegir un sabor disponible. Ingresa el sabor a agregar (Carne, Pollo, Fileteada):"
        );
      }
      console.log(gusto);
    }
  }

  alert("SU PEDIDO HA SIDO ENVIADO. MUCHAS GRACIAS!");
}

alert(
  'Abrir "console" antes de empezar tu pedido. Para realizar tu pedido hace click en "HACER PEDIDO".'
);

let startPedido = document.getElementById("startPedido");

startPedido.addEventListener("click", realizarPedido, true);