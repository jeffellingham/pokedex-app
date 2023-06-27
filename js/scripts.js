
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //To add more pokemon/data to the array
    function add(pokemon) {
        if ( typeof pokemon === "object" && 
        "name" in pokemon) {
        pokemonList.push(pokemon);
        } else {
            console.log("Pokemon data entered incorrectly. Please try again.")
        }
    };

    //This function is equivalent to calling pokemonList before I wrapped it in an IIFE
    function getAll() {
        return pokemonList;
    };

    //I tried writing a filter function here, but don't think it actually works
    function pickType(types) {
        return pokemonList.filter(pokemonList.type === types);
    };

    //Function to add each pokemon data to a newly created DOM element
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        loadDetails(pokemon).then(function () {
            button.innerHTML += '<h1>' + pokemon.id + '. ' + pokemon.name + '</h1>';
            button.innerHTML += '<img src="' + pokemon.imageUrl + '" alt="' + pokemon.name + '\'s image" >';

            button.classList.add('pokeList--item');
            // Adds background color based on Pokemon's first type, can't figure out how to split for dual types
            button.classList.add(pokemon.types[0]["type"]["name"]);
            // if (pokemon.types.length > 1) {
            //     button.innerHTML += 'style="background-color: linear-gradient(to right, '
            // }
        })
    
        listItem.appendChild(button);
        pokeList.appendChild(listItem);

        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    };

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    // Pulling all desired data from inside each Pokemon's provided URL
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.modalImageUrl = details.sprites.other.dream_world.front_default;
            item.id = details.id;
            item.height = details.height / 10;
            item.weight = details.weight / 10;
            item.types = [];
            for(let i = 0; i < details.types.length; i++){
                item.types[i] = details.types[i];
            }
            item.hp = details.stats[1].base_stat;
            item.attack = details.stats[2].base_stat;
            item.defense = details.stats[3].base_stat;
            hideLoadingMessage();
        }).catch(function(e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    // Function for modal and its functionality
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        //Create close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerHTML += '<img src="img/close_icon.png" alt="close button">';
        closeButtonElement.addEventListener('click', hideModal);

        //Create modal navigation buttons
        // let leftButtonElement = document.createElement('button');
        // leftButtonElement.classList.add('previous-button');
        // leftButtonElement.innerHTML += '<img src="img/left_arrow_icon.png" alt="previous nav button">';
        // leftButtonElement.addEventListener('click', previousModal);
        // let rightButtonElement = document.createElement('button');
        // rightButtonElement.classList.add('next-button');
        // rightButtonElement.innerHTML += '<img src="img/right_arrow_icon.png" alt="next nav button">';
        // rightButtonElement.addEventListener('click', nextPokemon);


        //Pokemon name and number
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.id + '. ' + pokemon.name + '\n';
        titleElement.innerHTML += '<img src="'+pokemon.modalImageUrl+'" >';

        //Pokemon info and picture
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height + 'm';
        let contentElement2 = document.createElement('p');
        contentElement2.innerText = 'Weight: ' + pokemon.weight + 'kg\n';
        let contentElement3 = document.createElement('p');
        contentElement3.innerText += 'Types: ' + pokemon.types[0]["type"]["name"];
        if (pokemon.types.length > 1) {
            contentElement3.innerText += ', ' + pokemon.types[1]["type"]["name"];
        }
        //Stats
        let statContainer = document.createElement('div');
        statContainer.classList.add('stat-container');
        // statContainer.innerText = "Stats:"
        let hpStat = document.createElement('span');
        hpStat.classList.add('stat-item');
        hpStat.innerText += pokemon.hp;
        hpStat.innerHTML += '<img src="img/health_icon.png" alt="HP icon" >';
        let attackStat = document.createElement('span');
        attackStat.classList.add('stat-item');
        attackStat.innerText += pokemon.attack;
        attackStat.innerHTML += '<img src="img/attack_icon.png" alt="attack icon" >';
        let defenseStat = document.createElement('span');
        defenseStat.classList.add('stat-item');
        defenseStat.innerText += pokemon.defense;
        defenseStat.innerHTML += '<img src="img/defense_icon.png" alt="defense icon" >';

        
        //Adding modal elements to DOM
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        // titleElement.appendChild(leftButtonElement);
        // titleElement.appendChild(rightButtonElement);
        modal.appendChild(contentElement);
        modal.appendChild(contentElement2);
        modal.appendChild(contentElement3);
        modal.appendChild(statContainer);
        statContainer.appendChild(hpStat);
        statContainer.appendChild(attackStat);
        statContainer.appendChild(defenseStat);
        modalContainer.appendChild(modal);

        //Trying to figure out next and previous buttons...
        // function nextModal() {
        //     hideModal();
        //     let nextPokemon = pokemon.nextSibling;
        //     showModal(pokemon.nextSibling);
        // }
        // function previousModal() {
        //     hideModal();
        //     let prevPokemon = pokemon.previousSibling;
        //     showDetails(pokemon.previousSibling);
        // }

        function hideModal() {
            modalContainer.classList.remove('is-visible');
        }

        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

        modalContainer.classList.add('is-visible');

        //close modal by clicking outside the modal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            //Specifying the container excludes the child (the actual modal)
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    //Trying to figure out next and previous buttons..
    // function nextPokemon(pokemon) {
    //     let next = pokemon + 1;
    //     loadDetails(next).then(() => {
    //         showModal(next);
    //     })
    // }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    };

    function showLoadingMessage () {
        document.querySelector('.pokedex').classList.add('hidden');
    }

    function hideLoadingMessage () {
        document.querySelector('.pokedex').classList.remove('hidden');
        document.querySelector('.loader').classList.add('hidden');
    }

    return {
        add: add,
        getAll: getAll,
        pickType,
        addListItem,
        showDetails,
        loadList,
        loadDetails,
        hideLoadingMessage
    };
})();

pokemonRepository.loadList().then(function(){
    //That loaded the data, now it's ready to be read/used
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
}).then(function() {
    pokemonRepository.hideLoadingMessage();
}).catch(function(e) {
    hideLoadingMessage();
    console.error(e);
});



