// VARIABLES / CONSTANTES.
const buttonCart = document.querySelector("#buttonCart");
const myVinylsContainer = document.querySelector(".render-vinyls");
const tableBody = document.querySelector("#table-body");
const cartContainer = document.querySelector("#modal-container");
const searchBar = document.querySelector("#searchBar");


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
        cart.find((item) => {
            if (cartItem.id == item.id && item.numberOfUnits) {
                item.numberOfUnits++;
                item.price += cartItem.price
                document.getElementById(`cantidad-product-${cartItem.id}`).innerText = `${item.numberOfUnits}`
                document.getElementById(`total-prod-${cartItem.id}`).innerText = `${item.price.toFixed(2)}`
            }
        });
        //AGREGAR ITEM POR PRIMERA AL CARRITO
    } else {
        cart.push({
            ...cartItem,
            numberOfUnits: 1,
        });

        alert(`"${cartItem.artist
            } - ${cartItem.album}" was added to your cart.`);

        tableBody.innerHTML += `
        <tr>
            <th>${cartItem.id}</th>    
            <th>${cartItem.artist} - ${cartItem.album}</th>
            <th id="cantidad-product-${cartItem.id}">1</th>
            <th id="total-prod-${cartItem.id}">$${cartItem.price}</th>
        </tr>
    `;
    }

    //SUMA TOTAL A PAGAR DE ITEMS EN EL CARRITO 
    let cartTotal = cart.reduce((acumulador, prod) => acumulador + prod.price, 0);

    document.getElementById("total").innerText =
        "Total a pagar $: " + cartTotal.toFixed(2);
    document.getElementById("itemCounterCart").innerText = cart.length;
    // console.table(cart);
}

//MUESTRA O ESCONDE EL DIV DEL CARRITO
function showHideCart() {
    if (cartContainer.classList.contains("dont-show")) {
        cartContainer.classList.remove("dont-show")
    } else {
        cartContainer.classList.add("dont-show")
    }
}

function clearContainer() {
    myVinylsContainer.innerHTML = "";
}

// FILTRADO DE BUSQUEDA POR ARTISTA
function searchFilterItem() {
    let searchBarText = searchBar.value.toUpperCase();
    let filterSeach = myVinyls.filter((vinyl) =>
        vinyl.artist.toUpperCase().includes(searchBarText)
    );
    //LIMPIA CONTENEDOR DE VINILOS 
    clearContainer();
    //MUESTRA RESULTADO DE BUSQUEDA.
    filterSeach.forEach((myVinyls) => {
        myVinylsContainer.innerHTML += `
            <article class="col-sm-12 col-md-6 col-lg-3">
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
    console.log(filterSeach);
}

function capturarEnter(e) {
    if (e.which == 13 || e.keycode == 13) {
        searchFilterItem();
        e.preventDefault();
    }
}

vinylsEl();
buttonCart.onclick = showHideCart;
searchBar.addEventListener("keypress", capturarEnter);
