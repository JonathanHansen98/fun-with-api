$(document).ready(function () {

    $("#form").keydown(function (e) {
        if (e.which === 13) {
            e.preventDefault()
            let userInput = $("#formInput").val()
            let userLower = userInput.toLowerCase()
            $(".apiText").empty()
            $("#form")[0].reset()
            callAJAX(userLower)
        } 
    })

    $("#generate").click(function(e){
        console.log("works")
        e.preventDefault()
        $(".apiText").empty()
        $("#form")[0].reset()
        $.ajax({
            url:"https://pokeapi.co/api/v2/pokemon?&limit=964",
            method: "GET"
        }).then(function (response) {
            let randIndex = Math.floor(Math.random()*964)
            console.log(randIndex)
            let randName = response.results[randIndex].name
            callAJAX(randName)
            $("#formInput").attr("placeholder", randName)
        })
    })

function callAJAX(name) {
    let queryURL = "https://pokeapi.co/api/v2/pokemon/" + name + "/"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // Appends all moves
        for (let index = 0; index < response.moves.length; index++) {
            
            let moveItem = $("<p>").text(response.moves[index].move.name)
            $("#moves").append(moveItem)
        }
        // Appends all pokemon's types to HTML
        for (let index = 0; index < response.types.length; index++) {
            console.log(response.types[index].type.name)
            let typeItem = $("<p>").text(response.types[index].type.name)
            $("#types").append(typeItem)
        }
        // AJAX call to species URL
        $.ajax({
            url: response.species.url,
            method: "GET"
        }).then(function (r){
            // finds object with english flavor text and appends that text
            let engText = r.flavor_text_entries.find(obj => obj.language.name === "en").flavor_text
             let flavorText = $("<p>").text(engText)
            $("#description").append(flavorText)
        })
        // Sets IMG source to pokemon's Sprite: front_default
        if (response.sprites.front_default === null) {
            $("#pokeIMG").attr("src","https://www.pinclipart.com/picdir/big/351-3517855_pikachu-clipart-bye-pikachu-with-no-background-png.png")
        }
        else {
            $("#pokeIMG").attr("src", response.sprites.front_default)
        }
        // Appends pokemon's pokedex ID
        let id = $("<p>").text(response.id)
        $("#id").append(id)
    });
}
});