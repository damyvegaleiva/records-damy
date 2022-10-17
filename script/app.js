alert(
    'Abrir "console" antes de ver el "MENU" o "HACER TU PEDIDO".'
);
// ------------------------------------PROYECTO AVANZADO CON DOM------------------------------------
// let addButton_01 = document.getElementById("addButton-1");
// const cartModal = document.querySelector("#show-cart");
// const saboresContenedor = document.querySelector(".row-sabores");
// const startPedido = document.querySelector("#startPedido");
// const modalContainer = document.querySelector("#modal-container");
// const showCart = document.querySelector("#show-cart");
// const cart = [];

// function saboresEmpanadasElCreator() {
//     misEmpanadas.forEach((empanada) => {
//         saboresContenedor.innerHTML += `
//         <article class="col-sm-12 col-md-6 col-lg-3">
//           <img src="${empanada.image}" alt="" class="w-100 img-thumbnail">
//           <h2 class="empanadas-sabores">${empanada.name}</h2>
//           <p>${empanada.ingredients}</p>
//             <div class="options">
//               <h5>$${empanada.price}</h5>
//               <button id="addButton-${empanada.id}" class="btn btn-bg__color mb-2 w-100">Agregar</button>
//             </div>
//         </article>
//     `;
//     });
// }

// function saludar(usuario) {
//     return console.log(`Hola ${usuario}`);
// }

// function realizarPedido() {
//     let nombre = prompt("Bienvenido/a a Milonga. Cual es tu nombre?");

//     saludar(nombre);

//     let cantidadEmpanadas = parseInt(
//         prompt("Ingresa la cantidad de empanadas a comprar: ")
//     );

//     if (parseInt(cantidadEmpanadas) === 1) {
//         console.log(`Tu orden es de ${cantidadEmpanadas} empanada.`);
//     } else if (parseInt(cantidadEmpanadas)) {
//         console.log(`Tu orden es de ${cantidadEmpanadas} empanadas.`);
//     } else {
//         while (!parseInt(cantidadEmpanadas)) {
//             cantidadEmpanadas = parseInt(
//                 prompt(
//                     "Debes ingresar un numero valido. Vuelve a ingresar el numero de empanadas que queres comprar."
//                 )
//             );
//         }
//         if (parseInt(cantidadEmpanadas) === 1) {
//             console.log(`Tu orden es de ${cantidadEmpanadas} empanada.`);
//         } else {
//             console.log(`Tu orden es de ${cantidadEmpanadas} empanadas.`);
//         }
//     }

//     let precioEmpanadas = cantidadEmpanadas * 3;
//     const ENVIO = precioEmpanadas * 0.15;
//     let precioTotal = precioEmpanadas + ENVIO;

//     alert(
//         `El costo de ENVIO de tu pedido es de un 15%($${ENVIO}) de tu total. El precio total de tu pedido es de $${precioTotal}`
//     );
//     console.log(`El costo de tu pedido es de $${precioTotal}.`);

//     for (cantidadEmpanadas; cantidadEmpanadas > 0; cantidadEmpanadas--) {
//         let gusto = prompt("Ingresa el sabor a agregar (Carne, Pollo, Espinaca):");
//         if (
//             gusto.toLowerCase() === "carne" ||
//             gusto.toLowerCase() === "pollo" ||
//             gusto.toLowerCase() === "espinaca"
//         ) {
//             console.log(gusto);
//         } else {
//             while (
//                 gusto.toLowerCase() != "carne" &&
//                 gusto.toLowerCase() != "pollo" &&
//                 gusto.toLowerCase() != "espinaca"
//             ) {
//                 gusto = prompt(
//                     "Elegir un sabor disponible. Ingresa el sabor a agregar (Carne, Pollo, Espinaca):"
//                 );
//             }
//             console.log(gusto);
//         }
//     }

//     alert(`TU PEDIDO HA SIDO ENVIADO. MUCHAS GRACIAS!`);
// }

// function expandCart() {
//     const modalHeader = document.createElement("div");
//     modalHeader.className = "modal-header";
//     modalHeader.innerHTML = `
//     <h2 class="modal-header-title">Carrito</h2>
//     `;
//     modalContainer.append(modalHeader);

//     const modalbutton = document.createElement("h5");
//     modalbutton.innerText = "x";
//     modalbutton.className = "modal-header-button";
//     modalHeader.append(modalbutton);

//     cart.forEach((product) => {
//         let cartItem = document.createElement("div");
//         cartItem.classList = "modal-item";
//         cartItem.innerHTML = `
//         <img src ="${product.image}">
//         <h3>${product.name}</h3>
//         <p>${product.price}</p>
//         `;
//         modalContainer.append(cartItem);
//     });
// }

// function addToCart() {
//     alert("agregado");
//     cart.push(misEmpanadas[0]);
//     console.table(cart);
// }

// saboresEmpanadasElCreator();

// startPedido.onclick = realizarPedido;
// showCart.onclick = expandCart;
// addButton_01.onclick = addToCart;

// ------------------------------------SEGUNDA ENTREGA------------------------------------
let cart = [];
let totalCart;
let opcionEmpanadas;
let filtroDeEmpanadas;
const buttonMakeOrder = document.querySelector("#startPedido")
const buttonVerMenu = document.querySelector("#verMenu")
buttonVerMenu.onclick = ElegirMenu;
buttonMakeOrder.onclick = makeOrder;
let currentDate = new Date().toDateString();


function ElegirMenu() {
    filtroDeEmpanadas = prompt(`Wich menu of empanadas would you like to see?
1) Vegetarian
2) Meat
3) Todas
`)
    if (filtroDeEmpanadas == 1) {
        filtroDeEmpanadas = "vegetarian"
    }
    else if (filtroDeEmpanadas == 2) {
        filtroDeEmpanadas = "meat"
    }
    else if (filtroDeEmpanadas == 3) {
        filtroDeEmpanadas = "todas"
    }
    else {
        while ((!parseInt(filtroDeEmpanadas)) || filtroDeEmpanadas >= 4) {
            filtroDeEmpanadas = prompt(`Wich menu of empanadas would you like to see?
1) Vegetarian
2) Meat
3) Todas
`)
        }
    }
    const empanadasFilter = misEmpanadas.filter((empanada) => empanada.typeOfProduct.includes(filtroDeEmpanadas));
    console.table(empanadasFilter);
}


function makeOrder() {
    do {
        opcionEmpanadas = parseInt(prompt(`Agrega las empanadas que quieras comprar 1?
    1) ${misEmpanadas[0].name} ($${misEmpanadas[0].price})
    2) ${misEmpanadas[1].name} ($${misEmpanadas[1].price})
    3) ${misEmpanadas[2].name} ($${misEmpanadas[2].price})
    4) ${misEmpanadas[3].name} ($${misEmpanadas[3].price})
    5) Terminar.`))
        if (opcionEmpanadas === 1) {
            console.log(`Tu empanada de ${misEmpanadas[0].name} fue agregada al carrito.`);
            cart.push(misEmpanadas[0].price)
        }
        else if (opcionEmpanadas === 2) {
            console.log(`Tu empanada de ${misEmpanadas[1].name} fue agregada al carrito.`);
            cart.push(misEmpanadas[1].price)
        }
        else if (opcionEmpanadas === 3) {
            console.log(`Tu empanada de ${misEmpanadas[2].name} fue agregada al carrito.`);
            cart.push(misEmpanadas[2].price)
        }
        else if (opcionEmpanadas === 4) {
            console.log(`Tu empanada de ${misEmpanadas[3].name} fue agregada al carrito.`);
            cart.push(misEmpanadas[3].price)
        }

        totalCart = cart.reduce((acumulador, prod) => acumulador + prod, 0);
    }
    while (opcionEmpanadas < 5);

    console.table(cart);
    console.log(`El total de tu pedido es de: $${totalCart}`);
    alert(`Tu pedido ha sido recibido ${currentDate}`)
}
