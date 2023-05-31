
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

pokemonList.forEach(function(pokemon) {
    document.write(
        "<section><p>#" + pokemon.id + " " + pokemon.name + "</p>"
    );
    document.write(
        "<p>Height: <span>" + pokemon.height + "m</span></p>"
    );
    document.write("<p>Type: ");
    pokemon.type.forEach(function(types) {
        document.write("<span>" + types + " - ");
    });
    document.write("</span></p>");
    document.write("<p>Weaknesses: ");
    pokemon.weaknesses.forEach(function(weakness) {
        document.write("<span>" + weakness + " - ");
    });
    document.write("</span></p><hr></section>");
});



// for (let i = 0; i < pokemonList.length; i++) {
//     //Go through each object and start with Pokemon's id and name
//     document.write(
//         "<section>#" + pokemonList[i].id + " " + pokemonList[i].name + "<br>"
//     );
//     //Print each Pokemon's height and text if condition met
//     if (pokemonList[i].height > 1) {
//         document.write(
//             "Height: " + pokemonList[i].height + "m" +
//                 "    <-- Wow, that's big!"
//         );
//     } else if (pokemonList[i].height < .5) {
//         document.write(
//             "Height: " + pokemonList[i].height + "m" +
//                 "    <-- Aww, it's so tiny!"
//         );
//     } else {
//         document.write(
//             "Height: " + pokemonList[i].height + "m"
//         );
//     }
//     document.write('<br>');
//     //For loops to print each type and additional text if condition met
//     document.write("Type: ");
//     for (let j = 0; j < pokemonList[i].type.length; j++) {
//         document.write(pokemonList[i].type[j]);
//         if ((j+1) < pokemonList[i].type.length) {
//             document.write(', ');
//         }
//         else if ((j+1) === pokemonList[i].type.length) {
//             document.write('.');
//         }
//     }
//     for (let j = 0; j < pokemonList[i].type.length; j++){
//         if (pokemonList[i].type[j] === 'fire'){
//             document.write(' <-- Woah, this one\'s so hawt right now!')
//         }
//         else if (pokemonList[i].type[j] === 'bug') {
//             document.write(' <-- Eww, it\'s a bug!');
//         }
//     }
//     document.write('<br>');
//     //Same for loop for weaknesses, but no conditional text
//     document.write("Weaknesses: ");
//     for (let j = 0; j < pokemonList[i].weaknesses.length; j++) {
//         document.write(pokemonList[i].weaknesses[j]);
//         if ((j+1) < pokemonList[i].weaknesses.length) {
//             document.write(', ');
//         }
//         else if ((j+1) === pokemonList[i].weaknesses.length) {
//             document.write('.');
//         }
//     }
//     document.write('</section>')
// }


