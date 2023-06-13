
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
            button.innerText = pokemon.id + '. ' + pokemon.name + 
                '\nHeight: ' + pokemon.height + 'm' + '\nWeight: ' + 
                pokemon.weight + 'kg\n';
            button.innerHTML += '<img src="'+pokemon.imageUrl+'" >';
            button.classList.add('pokeList--item');
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

    function loadDetails(item) {
        // showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.id = details.id;
            item.height = details.height / 10;
            item.weight = details.weight / 10;
            for(let i = 0; i < item.types.length; i++){
                item.types[i] = details.types;
            }
            // hideLoadingMessage();
        }).catch(function(e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
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
})



