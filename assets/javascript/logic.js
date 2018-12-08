$(document).ready(function () {

    var mySearchs = ["Captian Picard", "Funny", "Sponge Bob", "Why Me!", "Please"]


    // function to loop through my search terms and create the buttons

    for (i = 0; i < mySearchs.length; i++) {
        var a = $("<a>");
        a.addClass("btn btn-primary btn-lg m-1 search");
        a.attr("role", "button");
        a.text(mySearchs[i]);
        $(".jumbotron").append(a);
    }

    // create on click event to grab search box input
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var buttonVal = $("#input").val();
        $("#input").val("")


        var a = $("<a>");
        a.addClass("btn btn-primary btn-lg m-1 search");
        a.attr("role", "button");
        a.text(buttonVal);
        $(".jumbotron").append(a);
    })

    //create function to search giphy and generate imgs

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
            console.log(response)
            results = response.data;

            for (i = 0; i < results.length; i++) {
                newDiv = $("<div>");
                newDiv.addClass("text-center p-1");
                imgTag = $("<img>");
                imgTag.attr("src", results[i].images.fixed_height_still.url)
                imgTag.addClass("rounded")
                imgTag.attr("data-state", "still")
                imgTag.attr("data-still", results[i].images.fixed_height_still.url)
                imgTag.attr("data-animate", results[i].images.fixed_height.url)
                p = $("<p>").text("Rating " + results[i].rating)
                newDiv.append(imgTag);
                newDiv.append(p);
                $(".row").prepend(newDiv);
            }
            $("img").on("click", function () {
                imgState = $(this).attr("data-state");
                imgStill = $(this).attr("data-still")
                imgAnimate = $(this).attr("data-animate")
                console.log(imgState);
                if (imgState === "still") {
                    $(this).attr("data-state", "animate");
                    $(this).attr("src", imgAnimate)
                } else if (imgState === "animate") {
                    $(this).attr("data-state", "still");
                    $(this).attr("src", imgStill);

                }
            })
        })



    }

    $(document).on("click", ".search", giphySearch)



})