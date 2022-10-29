// VARIABLES / CONSTANTES.
const buttonCart = document.querySelector("#buttonCart");
const myVinylsContainer = document.querySelector(".render-vinyls");
const tableBody = document.querySelector("#table-body");
const cartContainer = document.querySelector("#modal-container");
const searchInput = document.querySelector("#searchInput");

// CART ARRAY.
const cart = [];

// CREA ELEMENTOS POR CARA ITEM DEL ARRAY.
function vinylsEl() {
    myVinyls.forEach((vinyl) => {
        myVinylsContainer.innerHTML += `
        <article class="col-sm-12 col-md-6 col-lg-3">
            <img src="${vinyl.image}" alt="" class="w-100 img-thumbnail">
            <h2 class="empanadas-sabores">${vinyl.album}</h2>
            <p>${vinyl.artist}</p>
            <div class="options">
                <h5>$${vinyl.price}</h5>
                <button id="addButton-${vinyl.id}" class="btn btn-bg__color mb-2 w-100">Agregar</button>
            </div>
        </article>
    `;
    });
    //CAPTURA CADA BOTON UNICO PARA CADA PRODUCTO.
    myVinyls.forEach((vinyl) => {
        document
            .getElementById(`addButton-${vinyl.id}`)
            .addEventListener("click", function () {
                addToCart(vinyl);
            });
    });
}

// PUSH ITEMS AL CARRITO
function addToCart(cartItem) {
    //AGREGA UNIDAD DE PRODUCTO SI ITEM YA EXISTE EN CARRITO
    if (cart.find((item) => item.id == cartItem.id)) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Item already exists in cart.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cart.find((item) => {
                    if (cartItem.id == item.id && item.numberOfUnits) {
                        item.numberOfUnits++;
                        item.price += cartItem.price;
                        document.getElementById(
                            `cantidad-product-${cartItem.id}`
                        ).innerText = `${item.numberOfUnits}`;
                        document.getElementById(
                            `total-prod-${cartItem.id}`
                        ).innerText = `${item.price.toFixed(2)}`;
                        updateCart();
                    }
                });
            }
        })
        //AGREGAR ITEM POR PRIMERA AL CARRITO
    } else {
        cart.push({
            ...cartItem,
            numberOfUnits: 1,
        });
        //ALER ITEM AGREGADO AL CARRITO
        Swal.fire({
            title: `${cartItem.artist} - ${cartItem.album}`,
            text: 'Was added to the cart.',
            imageUrl: cartItem.image,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `${cartItem.artist} - ${cartItem.album}`,
            backdrop: 'swal2-backdrop-show',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        tableBody.innerHTML += `
        <tr id="row-item-${cartItem.id}">
            <th>${cartItem.id}</th>    
            <th>${cartItem.artist} - ${cartItem.album}</th>
            <th id="cantidad-product-${cartItem.id}">1</th>
            <th id="total-prod-${cartItem.id}">$${cartItem.price}</th>
            <th id="remove-item-${cartItem.id}">X</th>
        </tr>
    `;
        //ELIMINAR ITEM CARRITO EVENTO/CAPTURA
        cart.forEach((vinyl) => {
            document
                .getElementById(`remove-item-${vinyl.id}`)
                .addEventListener("click", () => {
                    removeItemCart(vinyl);
                });
        });
    }
    updateCart();
}

function removeItemCart(vinyl) {
    cart.splice(cart.indexOf(vinyl), 1)
    document.getElementById(`row-item-${vinyl.id}`).innerHTML = "";
    updateCart();
}

//UPDATECART
function updateCart() {
    //SUMA TOTAL A PAGAR DE ITEMS EN EL CARRITO
    let cartTotal = cart.reduce((acumulador, prod) => acumulador + prod.price, 0);
    document.getElementById("total").innerText =
        "Total a pagar $: " + cartTotal.toFixed(2);
    document.getElementById("itemCounterCart").innerText = cart.reduce(
        (acumulador, prod) => acumulador + prod.numberOfUnits,
        0
    );
}

//MUESTRA O ESCONDE EL DIV DEL CARRITO
function showHideCart() {
    if (cartContainer.classList.contains("dont-show")) {
        cartContainer.classList.remove("dont-show");
    } else {
        cartContainer.classList.add("dont-show");
    }
}

//LIMPIA CONTENEDOR VINYLS
function clearContainer() {
    myVinylsContainer.innerHTML = "";
}

// FILTRADO DE BUSQUEDA POR ARTISTA
function searchFilterItem() {
    let searchBarText = searchInput.value.toUpperCase();
    let filterSeach = myVinyls.filter((vinyl) =>
        vinyl.artist.toUpperCase().includes(searchBarText)
    );
    //LIMPIA CONTENEDOR DE VINILOS
    clearContainer();
    //MUESTRA RESULTADO DE BUSQUEDA.
    filterSeach.forEach((myVinyls) => {
        myVinylsContainer.innerHTML += `
        <article class= "col-sm-12 col-md-6 col-lg-3">
        <img src="${myVinyls.image}" alt="" class="w-100 img-thumbnail">
            <h2 class="empanadas-sabores">${myVinyls.album}</h2>
            <p>${myVinyls.artist}</p>
                <div class="options">
                    <h5>$${myVinyls.price}</h5>
                    <button id="addButton-${myVinyls.id}" class="btn btn-bg__color mb-2 w-100">Agregar</button>
                </div>
        </article>
        `;
    });
}

function capturarEnter(e) {
    if (e.which == 13 || e.keycode == 13) {
        searchFilterItem();
        e.preventDefault();
    }
}

vinylsEl();
buttonCart.onclick = showHideCart;
searchInput.addEventListener("keypress", capturarEnter);
