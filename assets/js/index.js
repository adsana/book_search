
$(document).ready(function(){

$("#submit-btn").click(function(event) {
event.preventDefault();

var searchBook = $("#title-search").val().trim();
var searchAuth = $("#author-search").val().trim();

var queryURL = "https://www.googleapis.com/books/v1/volumes?api_key=AIzaSyC_kBKxX1bOeYZ9z3Itd5x86QwbLL-uS_8&q=" + searchBook + searchAuth
 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

$("#results-container").empty();
      
for(var i = 0; i < response.items.length; i++) {


    var title = response.items[i].volumeInfo.title;
    var author = response.items[i].volumeInfo.authors;
    var date = response.items[i].volumeInfo.publishedDate;
    var image = response.items[i].volumeInfo.imageLinks.smallThumbnail
    var bookImg = $("<img>").attr("src", image).addClass("SearchImage")

    var yourResults = $("<h6>").html(
    "Title: " + title + "<br>" +
    "Author: " + author + "<br>" +
    "Date: " + date + "<br>" 
    );
    console.log(yourResults);
         
$("#results-container").append(bookImg, yourResults);

document.cookie = 'cross-site-cookie=bar; SameSite=Lax';

};
});
});
var mvAPI = "9HpXkLyoiXesFWfFMw4cGjDg6SVR2upZ";
var queryURL="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" + mvAPI;
console.log(queryURL);


$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
console.log(response);

var bestsellers = response.results.books 
var count=0;

for(var j=0; j<10; j++) {

    var bookTitle= bestsellers[j].title;
    var bookAuth=bestsellers[j].author;
    var bookImg=bestsellers[j].book_image;
    var bookSynp= bestsellers[j].description;
    var bookRating= bestsellers[j].rank;
    count++;

    var booksImgHolder = $("<img>").attr("src",bookImg).attr("id", count).addClass("bestSellersImg").css({"width" : "100px"});

    var bestSellersInfo= $("<p>").html(
        "Rank " + bookRating  + "<br>" + 
        "Title: " + bookTitle + "<br>" + 
        "Author: " + bookAuth + "<br>"  +
        "Synopsis: " + bookSynp + "<br>" 
         )
       
     
   $("#best-sellers-container").append(booksImgHolder);

   var infoDiv= $("<div>");
infoDiv.html(bestSellersInfo).attr("id", "showInfo"+ count);
$("#best-sellers-container").append(infoDiv);
$(infoDiv).addClass("infoDiv");
$("#showInfo" + count).hide();
};

$(".bestSellersImg").on("click", function() {

    $(".infoDiv").hide()
    var attrShown= $(this).attr("id");
    console.log(attrShown);
    $("#showInfo"+ attrShown).show()
     
   
});
}); 
});