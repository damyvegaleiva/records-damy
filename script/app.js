//VARIABLES PARA DOM
const vinylContainer = document.getElementById("render-vinyls");
const modalContainer = document.getElementById("modal-container");
const totalPrice = document.getElementById("total");
const cartBody = document.getElementById("table-body");
const buttonCart = document.getElementById("buttonCart");
const cartCounter = document.getElementById("itemCounterCart");
const searchInput = document.getElementById("searchInput");
const purchaseButton = document.getElementById("purchaseButton");

//VARIABLES PARA USAR EN EL FORMULARIO
const nameInput = document.getElementById("name");
const creditCardInput = document.getElementById("credit-card");
const emailInput = document.getElementById("email");
const formSubmit = document.getElementById("form")
const error = document.getElementById("error");


// ARRAY DE DATA VACIO.
let arrayRecordsDataBase = [];

// TRAER DATA DE ARCHIVO LOCAL JSON (API FICTICIA) / FUNCION AUTOEJECTUABLE.
(async function getDataFromJson() {
    const response = await fetch("./products.json");
    arrayRecordsDataBase = await response.json();
    vinylContainer.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    setTimeout(() => {
        vinylContainer.innerHTML = "";
        renderVinylEl(arrayRecordsDataBase);
    }, 2500);
})();

//POSTEANDO LA COMPRA AL JSONPLACEHOLDER + LIMPIA EL CARRITO POST-COMPRA
function newPurchase() {
    if (cart.length == 0) {
        let timerInterval
        Swal.fire({
            title: 'Cart is empty!',
            timer: 1500,
            icon: 'error',
            timerProgressBar: true,
            willClose: () => {
                clearInterval(timerInterval)
            }
        });
    }
    else {
        const URLPOST = "https://jsonplaceholder.typicode.com/posts";
        const newPurchase = cart;
        fetch(URLPOST, {
            method: "Post",
            body: JSON.stringify(newPurchase),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then(dataBack => {
                console.log(dataBack);
            });
        cart.forEach(vinyl => {
            removeItemCart(vinyl.id);
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thanks for your purchase! 🛒',
            showConfirmButton: false,
            timer: 2000,
        });
    }
    showCart();
}

// TRAER CARRITO DEL STORAGE O EMPEZARLO VACIO
let cart = JSON.parse(localStorage.getItem("CART")) || [];

//RENDERIZAR SI HAY ITEMS EN EL CARRITO
renderItemCart();

//FUNCION AUTOEJECUTABLE PARA CREAR VINILOS
function renderVinylEl(arrayToRenderize) {
    arrayToRenderize.forEach((vinyl) => {
        vinylContainer.innerHTML += `
        <article class="col-sm-12 col-md-6 col-lg-3">
            <img src="${vinyl.image}" alt="" class="w-100 img-thumbnail">
            <h2 class="album-vinyl-heading">${vinyl.album}</h2>
            <p>${vinyl.artist}</p>
            <div class="options">
                <h5>$${vinyl.price}</h5>
                <button onclick="addToCart(${vinyl.id})" class="btn btn-bg__color mb-2 w-100">Add To Cart</button>
            </div>
        </article>
    `
    });
};

// CUANDO SE AGREGUE UN ITEM AL CARRITO POR PRIMERA VEZ SE EJECUTA EL ELSE PUSHEANDO AL CARRITO EL ITEM CON TODAS SUS PROPIEDADES Y AGREGANDOLE UNA PROPIEDAD DE UNIDAD.
// EN LA SEGUNDA VUELTA ENTRA POR EL IF Y AL ENCONTRAR UN ITEM CON EL MISMO ID SOLAMENTE LE AGREGA UNA UNIDAD.
function addToCart(id) {
    if (cart.some(vinyl => vinyl.id === id)) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You already have this item in your cart.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateNumberOfUnits("plus", id);
            }
        });
    } else {
        const item = arrayRecordsDataBase.find(vinyl => vinyl.id === id);
        cart.push({
            id: item.id,
            artist: item.artist,
            album: item.album,
            price: item.price,
            stock: item.stock,
            numberOfUnits: 1,
        });
        Swal.fire({
            title: `${item.artist} - ${item.album}`,
            text: 'Was added to your cart.',
            imageUrl: `${item.image}`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `${item.artist} - ${item.album}`,
        });
    }
    renderItemCart();
}

// RENDERIZADO DE LOS ITEMS DENTRO DEL CARRITO
function renderItemCart() {
    cartBody.innerHTML = "";
    cart.forEach(vinyl => {
        cartBody.innerHTML += `
        <tr>
            <th>${vinyl.id}</th>
            <th>${vinyl.artist} - ${vinyl.album}</th>
            <th><i class="fa-regular fa-square-minus" id="minus-icon" onclick="updateNumberOfUnits('minus', ${vinyl.id})"></i> ${vinyl.numberOfUnits} <i class="fa-regular fa-square-plus" id="plus-icon" onclick="updateNumberOfUnits('plus', ${vinyl.id})"></i></th>
            <th>$${vinyl.price}</th>
            <th><i class="fa-regular fa-trash-can" id="trash-icon" onclick="removeItemCart(${vinyl.id})"></i></th>
        </tr>
        `
    });
    updateCart();
}

// AGREGA UNA UNIDAD DEL MISMO ITEM SIEMPRE Y CUANDO HAYA STOCK O QUITA 1 UNIDAD SIEMPRE QUE HAYA 1 UNIDAD O MAS.
function updateNumberOfUnits(action, id) {
    cart.map(vinyl => {
        if (action === "plus" && vinyl.id === id && vinyl.numberOfUnits < vinyl.stock) {
            vinyl.numberOfUnits++;
        } else if (action === "minus" && vinyl.id === id && vinyl.numberOfUnits > 0) {
            vinyl.numberOfUnits--;
            if (vinyl.numberOfUnits === 0) {
                removeItemCart(id);
            };
        }
    });
    renderItemCart();
}

// MUESTRA EL TOTAL A PAGAR Y GUARDA EL CARRITO EN EL LOCAL STORAGE.
// MUESTRA EN EL CONTADOR EL TOTAL DEL UNIIDADES 
function updateCart() {
    cartCounter.innerText = cart.reduce((acumulador, vinyl) => acumulador + vinyl.numberOfUnits, 0);
    totalPrice.innerText = "Total a pagar: $" + cart.reduce((acumulador, vinyl) => acumulador + ((vinyl.numberOfUnits * vinyl.price)), 0).toFixed(2);
    saveToLocalStorage("CART", JSON.stringify(cart));

    if (cartCounter.innerText == 0) {
        totalPrice.innerText = "Your cart is empty";
    };
}

// FUNCION REUTILIZABLE PARA ALMACENAR ITEMS EN EL LOCALSTORAGE
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// MUESTRA/OCULTA EL CARRITO
function showCart() {
    if (modalContainer.classList.contains("dont-show")) {
        modalContainer.classList.remove("animate__bounceOutUp");
        modalContainer.classList.add("animate__animated", "animate__bounceInDown");
        modalContainer.classList.remove("dont-show");
    } else {
        modalContainer.classList.remove("animate__bounceInDown");
        modalContainer.classList.add("animate__bounceOutUp");
        setTimeout(() => {
            modalContainer.classList.add("dont-show");
        }, 500);
    }
}

// REMUEVE COMPLETAMENTE EL ITEM DEL CARRITO
function removeItemCart(id) {
    cart = cart.filter(vinyl => vinyl.id !== id);
    renderItemCart();
}

// CLICK PARA EJECUTRAR LA FUNCION DE MOSTRAR O NO CARRITO.
buttonCart.onclick = showCart;
purchaseButton.onclick = newPurchase;

// BUSQUEDA EN VIVO DE VINILOS POR SU ARTISTA Y/O ALBUM
searchInput.addEventListener("keyup", (e) => {
    let texto = e.target.value.toLowerCase();
    let arrayFiltrado = arrayRecordsDataBase.filter(vinyls => vinyls.artist.toLowerCase().includes(texto) || vinyls.album.toLowerCase().includes(texto));

    vinylContainer.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

    setTimeout(() => {
        vinylContainer.innerHTML = "";
        renderVinylEl(arrayFiltrado);
    }, 2000);
});

// EJECUTRA LA FUNCION DE VALIDAR LOS INPUTS AL TIPEAR EN LAS CASILLAS.
nameInput.onkeyup = validateInputs;
creditCardInput.onkeyup = validateInputs;
emailInput.onkeyup = validateInputs;


//PREVIENE QUE SE BORREN LOS DATOS YA INGRESADOS EN CASO DE ERROR O QUE SE ENTREGUE UN FORMULARIO VACIO.
formSubmit.addEventListener("submit", (evento) => {
    validateInputs(evento);
})

// VALIDA LOS INPUTS INGRESADOS
function validateInputs(evento) {

    //CAPTURA EL VALOR INGRESADO EN LOS INPUTS Y CON EL METODO ' TRIM() ' REMUEVE ESPACIOS VACIOS ADELANTE Y AL FINAL.
    const nameValue = nameInput.value.trim();
    const creditCardValue = creditCardInput.value.trim();
    const emailValue = emailInput.value.trim();

    //VALIANDO NOMBRE POR CAMPO VACIO, POR SI CONTIENE ALGUN CARACTER ESPECIAL USANDO UNA EXPRESION REGULAR O SI LA CANTIDAD DE CARACTERES ES MAYOR a 25.
    if (!nameValue || !(/^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/).test(nameInput.value)) {
        valError(nameInput, "Valid name is required.");
        evento.preventDefault();
    }
    else if (nameValue.length > 25) {
        valError(nameInput, "Name is too long.");
    }
    else {
        valSuccess(nameInput);
    }

    //VALIDANDO NUMERO DE TARJETA POR CAMPO VACIO, SI CANTIDAD DE CARACTERES ES MENOR A 16 O SI LO INGRESADO CONTIENE ALGUN CARACTER QUE NO SEA UN NUMERO.
    if (!creditCardValue || creditCardValue.length != 16 || isNaN(creditCardInput.value)) {
        valError(creditCardInput, "16-digit card number is required.");
        evento.preventDefault();
    } else {
        valSuccess(creditCardInput);
    }

    //VALIDANDO EMAIL POR CAMPO VACIO O COMPROBANDO POR VERDADERO O FALSO SI ES UN EMAIL VALIDO.
    if (!emailValue) {
        valError(emailInput, "Valid email is required.");
        evento.preventDefault();
    } else if (!valEmail(emailValue)) {
        valError(emailInput, "Email is not a valid email.")
        evento.preventDefault();
    }
    else {
        valSuccess(emailInput)
    }
}

//PARA CHEQUEAR SI EL EMAIL ES UN EMAIL VALIDO EJECUTANDO EL METODO TEST Y DEVOLVIENDO UN BOOLEANO EL CUAL SE ANALIZA EN EL ' ELSE IF '  DE VALIDANDO EMAIL (LA LINEA DE CODIGO DE LA EXPRESION REGULAR SI LA SACA DE INTERNET).
function valEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

//RECIBE COMO PARAMETRO EL ELEMENTO AL QUE VA A CAPTURAR Y EL MENSAJE DE ERROR QUE VA A MOSTRAR EN PANTALLA
//CAMBIA COLOR DE BORDER DEL INPUT
function valError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error")

    errorDisplay.innerText = message;
    inputControl.classList.add("error")
    inputControl.classList.remove("success")
}

//RECIBE COMO PARAMETRO EL ELEMENTO AL QUE VA A CAPTURAR PARA PONER EL BORDER EN VERDE
function valSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
}