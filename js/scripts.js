
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            id: 1,
            height: 0.7,
            type: ['grass', 'poison'],
            weaknesses: ['fire', 'psychic', 'flying', 'ice']
        },
        {
            name: 'Charmander',
            id: 4,
            height: 0.6,
            type: ['fire'],
            weaknesses: ['water', 'ground', 'rock']
        },
        {
            name: 'Charmeleon',
            id: 5,
            height: 1.1,
            type: ['fire'],
            weaknesses: ['water', 'ground', 'rock']
        },
        {
            name: 'Charizard',
            id: 6,
            height: 1.7,
            type: ['fire', 'flying'],
            weaknesses: ['water', 'electric', 'rock']
        },
        {
            name: 'Squirtle',
            id: 7,
            height: 0.5,
            type: ['water'],
            weaknesses: ['grass', 'electric']
        },
        {
            name: 'Caterpie',
            id: 10,
            height: 0.3,
            type: ['bug'],
            weaknesses: ['fire', 'flying', 'rock']
        },
        {
            name: 'Weedle',
            id: 13,
            height: 0.3,
            type: ['bug', ' poison'],
            weaknesses: ['fire', ' psychic', ' flying', ' rock']
        }
    ];

    //To add more pokemon/data to the array. Also checks 
    function add(pokemon) {
        if ( typeof pokemon === "object" && Object.keys(pokemon) === Object.keys(pokemonList[0])) {
        pokemonList.push(pokemon);
        }
    }

    //This function is equivalent to calling pokemonList before I wrapped it in an IIFE
    function getAll() {
        return pokemonList;
    }

    //I tried writing a filter function here, but don't think it actually works
    function pickType(types) {
        return pokemonList.filter(pokemonList.type === types);
    }

    function addListItem(pokemon) {
        let pokeList = document.querySelector('ul');

        let listItem = document.createElement('li');
    
        let button = document.createElement('button');
        button.innerText = pokemon.id + '. ' + pokemon.name + '\nType: ' + pokemon.type + '\nWeaknesses: ' + pokemon.weaknesses;
        button.classList.add('pokeList--item');
    
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        pickType,
        addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


