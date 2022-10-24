// VARIABLES / CONSTANTES
const buttonCart = document.querySelector("#buttonCart");
const myVinylsContainer = document.querySelector(".render-vinyls");
const tableBody = document.querySelector("#table-body");
const cartContainer = document.querySelector("#modal-container");
const searchBar = document.querySelector("#searchBar");

// CART ARRAY
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

    if (cart.find((item) => item.id == cartItem.id)) {
        alert("Item already exists.");
        cart.map((item) => {
            let numberOfUnits = item.numberOfUnits;
            numberOfUnits++;
            item.numberOfUnits = numberOfUnits
        })

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
            <th>1</th>
            <th>$${cartItem.price}</th>
        </tr>
    `;

        let cartTotal = cart.reduce(
            (acumulador, prod) => acumulador + prod.price,
            0
        );
        document.getElementById("total").innerText =
            "Total a pagar $: " + cartTotal.toFixed(2);
        document.getElementById("itemCounterCart").innerText = cart.length;
    }
    console.table(cart);
}

function showHideCart() {
    if (cartContainer.classList.contains("dont-show")) {
        cartContainer.classList.remove("dont-show")
    } else {
        cartContainer.classList.add("dont-show")
    }
}

// FILTRADO DE BUSQUEDA POR ARTISTA
function searchFilterItem() {
    let searchBarText = searchBar.value.toUpperCase();
    let filterSeach = myVinyls.filter((vinyl) =>
        vinyl.artist.toUpperCase().includes(searchBarText)
    );

    filterSeach.forEach((myVinyls) => {
        myVinylsContainer.innerHTML = `
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
