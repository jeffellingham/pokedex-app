//TODO: 1. make list buttons smaller when on small/mobile screens (font size, image, button, etc)
//TODO: 2. Set the size of modal images so the modal is consistent for every pokemon
//TODO: 4. Split background color for dual types, or switch to uniform color and list types with colors elsewhere, like under image or button

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let pokeTypes = [];

    //To add more pokemon/data to the array
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon data entered incorrectly. Please try again.");
        }
    }

    // Equivalent to calling pokemonList before I wrapped it in an IIFE
    function getAll() {
        return pokemonList;
    }

    // Create a search bar element.
    const searchBar = document.querySelector(".search-bar");
    // Add a keyup event listener to the search bar.
    searchBar.addEventListener("input", (event) => {
        // Get the search string from the user input.
        const searchString = event.target.value.toLowerCase();

        // Filter the API generated list based on the search string.
        const filteredList = pokemonList.filter((item) => {
            return item.name.toLowerCase().includes(searchString);
        });
        // Update the list of items in the DOM.
        document.querySelector(".pokemon-list").innerHTML = "";
        filteredList.forEach((item) => {
            addListItem(item);
        });
    });

    // Filter by type
    const typeFilter = document.getElementById("type-filter");
    //First I need to populate the select element--why didn't that work...?
    // pokeTypes.forEach((type) => {
    //     console.log(type);
    //     typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
    // })
    // Add eventListener to hardcorded select options
    typeFilter.addEventListener("change", function () {
        const selectedType = typeFilter.value;

        if (!typeFilter.classList.contains(selectedType)) {
            typeFilter.className = "";
            typeFilter.classList.add(selectedType);
        }

        const filteredPokemon = pokemonList.filter(function (pokemon) {
            //Tried a couple ways to filter for multiple selections, but none worked
            return pokemon.types.includes(selectedType);
        });

        document.querySelector(".pokemon-list").innerHTML = "";
        filteredPokemon
            .map(function (pokemon) {
                return addListItem(pokemon);
            })
            .join("");

        if (selectedType === "all") {
            getAll().forEach(function (pokemon) {
                addListItem(pokemon);
            });
        }
    });

    //Function to add each pokemon data to a newly created DOM element
    function addListItem(pokemon) {
        let pokeList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");

        loadDetails(pokemon).then(function () {
            listItem.classList.add("list-group-item");

            button.innerHTML += "<h1>" + pokemon.id + ". " + pokemon.name + "</h1>";
            button.innerHTML += '<img src="' + pokemon.imageUrl + '" alt="' + pokemon.name + "'s image and button\" >";

            button.classList.add("pokeList--item", "btn", "btn-warning");
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#pokeModal");

            // Adds background color based on Pokemon's first type
            button.classList.add(pokemon.types[0]);
            // But I can't figure out a good way to split for dual types
            // if (pokemon.types.length > 1) {
            // document.querySelector('.'+pokemon.name).classList.add(pokemon.types[1]);
            // button.classList.add(pokemon.types[1]);
            // listItem.style.backgroundColor = `linear-gradient(to right, ${type1}, ${type2})`;
            // GOAL: style="background: linear-gradient(90deg, #hex 50%, #hex 50%)"
            // }
        });

        listItem.appendChild(button);
        pokeList.appendChild(listItem);

        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Pulling all desired data from inside each Pokemon's provided URL
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.modalImageUrl = details.sprites.other.dream_world.front_default;
                item.id = details.id;
                item.height = details.height / 10;
                item.weight = details.weight / 10;
                item.types = [];
                for (let i = 0; i < details.types.length; i++) {
                    item.types[i] = details.types[i]["type"]["name"];
                }
                item.hp = details.stats[1].base_stat;
                item.attack = details.stats[2].base_stat;
                item.defense = details.stats[3].base_stat;
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    function showModal(pokemon) {
        let modalBody = document.querySelector(".modal-body");
        let modalTitle = document.querySelector(".modal-title");
        let modalHeader = document.querySelector(".modal-header");
        let modalFooter = document.querySelector(".modal-footer");
        const myModal = bootstrap.Modal.getInstance(document.querySelector(".modal"));

        // Clear existing content of the modal?
        // modalTitle.empty();
        // modalBody.empty();

        // Create content for modal
        modalTitle.innerText = pokemon.id + ". " + pokemon.name + "\n";

        let modalImage = document.getElementById("modalImage");
        modalImage.setAttribute("src", pokemon.modalImageUrl);

        let heightElement = document.querySelector(".height-el");
        heightElement.innerText = "Height: " + pokemon.height + "m";
        let weightElement = document.querySelector(".weight-el");
        weightElement.innerText = "Weight: " + pokemon.weight + "kg";
        let typeElement = document.querySelector(".type-el");
        typeElement.innerText = "Types: " + pokemon.types[0];
        if (pokemon.types.length > 1) {
            typeElement.innerText += ", " + pokemon.types[1];
        }

        // Footer nav buttons
        let leftButtonElement = document.querySelector(".previous-button");
        leftButtonElement.addEventListener("click", previousModal);
        let rightButtonElement = document.querySelector(".next-button");
        rightButtonElement.addEventListener("click", nextModal);

        //Stats
        let hpStat = document.querySelector(".hp-stat");
        hpStat.innerText = pokemon.hp;
        let attackStat = document.querySelector(".attack-stat");
        attackStat.innerText = pokemon.attack;
        let defenseStat = document.querySelector(".defense-stat");
        defenseStat.innerText = pokemon.defense;

        // Modal nav buttons in footer
        function nextModal() {
            showModal(pokemonList[pokemon.id]);
        }
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                nextModal();
            }
        });

        function previousModal() {
            showModal(pokemonList[pokemon.id - 2]);
        }
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                previousModal();
            }
        });

        // Bootstrap listener wasn't working for some reason, so I added one
        let closeButton = document.querySelector(".btn-close");
        closeButton.addEventListener("click", (e) => {
            document.getElementById("pokeModal").classList.add("hidden");
        });

        // TODO: Delete modal data from DOM so I can cycle through <10 pokemon before app freezes
        // function hideModal() {
        //     myModal.hide();
        //     myModal.addEventListener('shown.bs.hidden', event => {myModal.dispose();})
        // }
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    }

    function showLoadingMessage() {
        document.querySelector(".pokedex").classList.add("hidden");
    }

    function hideLoadingMessage() {
        document.querySelector(".pokedex").classList.remove("hidden");
        document.querySelector(".loader").classList.add("hidden");
    }

    return {
        add: add,
        getAll: getAll,
        addListItem,
        showDetails,
        loadList,
        loadDetails,
        hideLoadingMessage,
        // pokeSearch,
        // displayTypeButtons
    };
})();

pokemonRepository
    .loadList()
    .then(function () {
        //That loaded the data, now it's ready to be read/used
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    })
    .then(function () {
        pokemonRepository.hideLoadingMessage();
    })
    .catch(function (e) {
        pokemonRepository.hideLoadingMessage();
        console.error(e);
    });
