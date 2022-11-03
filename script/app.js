const vinylContainer = document.getElementById("render-vinyls");
const modalContainer = document.getElementById("modal-container");
const totalPrice = document.getElementById("total");
const cartBody = document.getElementById("table-body");
const buttonCart = document.getElementById("buttonCart");
const cartCounter = document.getElementById("itemCounterCart");
const searchInput = document.getElementById("searchInput");

//ARRAY TRAIDO DE BASE DE DATOS
let arrayRecordsDataBase = [];

function getArrayFromDataBase() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(myRecords)
        }, 1000)
    });
};

getArrayFromDataBase()
    .then((arrayDataBase) => {
        arrayRecordsDataBase = arrayDataBase;
        renderVinylEl(arrayRecordsDataBase);
    });


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
                <button onclick="addToCart(${vinyl.id})" class="btn btn-bg__color mb-2 w-100">Agregar</button>
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
        const item = arrayRecordsDataBase.find(vinyl => vinyl.id === id)

        cart.push({
            ...item,
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

// AGREGA UNA UNIDAD DEL MISMO ITEM SIEMPRE Y CUANDO HAYA STOCK O QUITA 1 UNIODAD SIEMPRE QUE HAYA 1 UNIDAD O MAS.
function updateNumberOfUnits(action, id) {
    cart.map(vinyl => {
        if (action === "plus" && vinyl.id === id && vinyl.numberOfUnits < vinyl.stock) {
            vinyl.numberOfUnits++;
        } else if (action === "minus" && vinyl.id === id && vinyl.numberOfUnits > 1) {
            vinyl.numberOfUnits--;
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
}

// FUNCION REUTILIZABLE PARA ALMACENAR ITEMS EN EL LOCALSTORAGE
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// MUESTRA/OCULTA EL CARRITO
function showCart() {
    if (modalContainer.classList.contains("dont-show")) {
        modalContainer.classList.remove("animate__bounceOutRight");
        modalContainer.classList.add("animate__animated", "animate__bounceInRight");
        modalContainer.classList.remove("dont-show");

    } else {
        modalContainer.classList.remove("animate__bounceInRight")
        modalContainer.classList.add("animate__bounceOutRight")
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