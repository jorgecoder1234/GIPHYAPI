$(document).ready(function () {
    var animals = ["Dog", "Cat", "Tiger", "Lion"];





    //This function help us to create a button for each animal entry will be called each we press the add  button
    function DisplayButtons() {
        $("#displaybuttons").empty();
        for (var i = 0; i < animals.length; i++) {
            var AniButton = $("<button>");
            AniButton.addClass("animalclass");
            AniButton.addClass("btn btn-info");
            AniButton.attr("data-name", animals[i]);
            AniButton.text(animals[i]);
            $("#displaybuttons").append(AniButton);

        }

    }

    //For ecah time the add animal button is clicked with add an animal
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animaltest = $("#animal-input").val().trim();
        if (animaltest == "") {
            return false;
        }

        animals.push(animaltest);
        console.log(animals);
        DisplayButtons();
    });



    //Here we use ajax to recover the information of the API , we use for show all the results
    function displayImagens() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=J6D6EvM3Ak389i8ZIfjzbsqjlR5HMwQq&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#ImagesView").empty();
            var results = response.data;
            if (results == "") {
                alert("There isn't a gif for this selected button");
            }
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#ImagesView").prepend(gifDiv);
            }
        });

    }

    //For display the initial buttons  
    DisplayButtons();


    //For each time youn press the animal button the images are displayed
    $(document).on("click", ".animalclass", displayImagens);

    //For ecah timet image is clicked, you stop or manime the gifimage 
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

});