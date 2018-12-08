$(document).ready(function () {

    // create varables to hold search and url
    var apiKey = "3tQurqegTvlciDFPe3A3Wj1tX6KUQl99";
    var search = ""
    var url = "http://api.giphy.com/v1/gifs/search?q=" + search + "&;api_key=" + apiKey + "&limit=10";


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

})