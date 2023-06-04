
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
            type: ['bug', 'poison'],
            weaknesses: ['fire', 'psychic', 'flying', 'rock']
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

    return {
        add: add,
        getAll: getAll,
        pickType
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write("<section><p>#" + pokemon.id + " " + pokemon.name + "</p>");

    document.write("<p>Height: <span>" + pokemon.height + "m</span></p>");

    document.write("<p>Type: ");
    pokemon.type.forEach(function (types, index) {
        document.write("<span>" + types);
        if (pokemon.type.length - 1 === index) {
            document.write(".");
        }
        else {
            document.write(", ");
        }
    });
    document.write("</span></p>");

    document.write("<p>Weaknesses: ");
    pokemon.weaknesses.forEach(function (weakness, index) {
        document.write("<span>" + weakness);
        if (pokemon.weaknesses.length - 1 === index) {
            document.write(".");
        }
        else {
            document.write(", ");
        }
    });
    document.write("</span></p><hr></section>");
});

