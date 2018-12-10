$(document).ready(function () {

    var mySearchs = ["Captian Picard", "Funny", "Sponge Bob", "Why Me!", "Please"]

    //function helper to create buttons
    function searchButtonHelper() {
        $("#jumbotron").empty();
        for (i = 0; i < mySearchs.length; i++) {
            var a = $("<a>");
            a.addClass("btn btn-primary btn-lg m-1 search");
            a.attr("role", "button");
            a.text(mySearchs[i]);
            $("#jumbotron").append(a);
        }
    }

    //function to create buttons
    function searchButtons(buttonVal) {

        if (typeof (buttonVal) == "undefined") {
            $("#jumbotron").empty();
            searchButtonHelper();
        } else {
            mySearchs.push(buttonVal)
            $("#jumbotron").empty();
            searchButtonHelper();
        }

    }

    // funtion to create images from ajax call
    function imgResults(results) {
        for (i = 0; i < results.length; i++) {
            var div = `<div
            class="text-center p-1">
            <img src="${results[i].images.fixed_height_still.url}" 
            class="rounded" 
            data-state="still"
            data-still="${results[i].images.fixed_height_still.url}"
            data-animate="${results[i].images.fixed_height.url}">
            <p>Rating ${results[i].rating}</p>
            </div>
            `
            $(".row").prepend(div);
        }
        $("img").on("click", function () {
            imgState = $(this).attr("data-state");
            imgStill = $(this).attr("data-still")
            imgAnimate = $(this).attr("data-animate")
            if (imgState === "still") {
                $(this).attr("data-state", "animate");
                $(this).attr("src", imgAnimate)
            } else if (imgState === "animate") {
                $(this).attr("data-state", "still");
                $(this).attr("src", imgStill);

            }
        })
    }

    //create function to search giphy

    function giphySearch() {
        // create varables to hold search and url
        var search = $(this).text()
        var apiKey = "3tQurqegTvlciDFPe3A3Wj1tX6KUQl99";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

        // create ajax call to giphy
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            results = response.data;
            imgResults(results)

        })



    }
    // create on click event to grab search box input
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var buttonVal = $("#input").val();
        $("#input").val("")

        if (buttonVal === "") {
            return
        } else {
            searchButtons(buttonVal)
        }
    })

    //script to listen when the buttons are clicked
    $(document).on("click", ".search", giphySearch)

    //when page loads create the buttons in the array
    searchButtons()

})