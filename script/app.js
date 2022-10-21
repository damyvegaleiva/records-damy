const buttonCart = document.querySelector("#buttonCart");
const myVinylsContenedor = document.querySelector(".row-vinyls");
const tableBody = document.querySelector("#table-body")
const cartContainer = document.querySelector("#modal-container")
const searchBar = document.querySelector("#searchBar")
const cart = [];

function vinylsEl() {
    myVinyls.forEach((myVinyls) => {
        myVinylsContenedor.innerHTML += `
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

    myVinyls.forEach((vinyl) => {
        document.getElementById(`addButton-${vinyl.id}`).addEventListener("click", function () {
            addToCart(vinyl)
        })
    })
}

function addToCart(cartItem) {
    cart.push(cartItem)
    alert(`"${cartItem.artist} - ${cartItem.album}" was added to your cart.`)

    tableBody.innerHTML += `
        <tr>
            <th>${cartItem.id}</th>    
            <th>${cartItem.artist} - ${cartItem.album}</th>
            <th>$${cartItem.price}</th>
        </tr>
    `;

    let totalCarrito = cart.reduce((acumulador, prod) => acumulador + prod.price, 0);
    document.getElementById("total").innerText = "Total a pagar $: " + totalCarrito;
    document.getElementById("itemCounterCart").innerText = cart.length;
}

function showHideCart() {
    if (cartContainer.style.display !== "none") {
        cartContainer.style.display = "none"
    } else {
        cartContainer.style.display = "block"
    }
}

function searchFilterItem() {

    let searchBarText = searchBar.value.toUpperCase()
    let busquedaFiltrada = myVinyls.filter((vinyl) => vinyl.artist.toUpperCase().includes(searchBarText));

    busquedaFiltrada.forEach((myVinyls) => {
        myVinylsContenedor.innerHTML = `
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
    console.log(searchBarText);
}

vinylsEl();
showHideCart()
buttonCart.onclick = showHideCart;
searchBar.addEventListener("keypress", capturarEnter)

function capturarEnter(e) {
    if (e.which == 13 || e.keycode == 13) {
        searchFilterItem();
        e.preventDefault();
    }
}