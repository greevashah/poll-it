var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var quote_response = JSON.parse(xhttp.responseText);
    //    console.log(quote_response)
       if(quote_response.type=="twopart"){
        content.innerHTML=quote_response.setup+"<br>"+quote_response.delivery;
       }
       else{
        content.innerHTML=quote_response.joke;
       }
       changeImage();
       var loader = document.getElementById("loader");
       loader.style.display = "none";
       content.style.display = "block";
    }
};

var reload = ()=> {
    var data=null;
    var content = document.getElementById("content");
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    content.style.display = "none";
    xhttp.open("GET","https://jokeapi.p.rapidapi.com/category/Programming?format=json");
    xhttp.setRequestHeader("x-rapidapi-host", "jokeapi.p.rapidapi.com");
    xhttp.setRequestHeader("x-rapidapi-key", "1c40dc089cmshc7a37fbefcee483p1e6d3ejsncbc9f3db0a70");
    xhttp.send(data);
}

var urls=[]
$(document).ready(function(){
    $.ajax({
        url: "https://rss.app/feeds/n46ShHa0AovxUOp4.xml",
        method: "GET",
        dataType: "xml",
        success: function(item) {
            $(item).find("item").each(function(){
                var ele=$(this);
                // var imageUrl= ele.find("media").attr('url');
                var imageUrl = "https:"+ele.find('media\\:content, content').attr('url');
                urls.push(imageUrl);
            });
            // changeImage();
        }
    });
    reload();
    // window.setInterval(changeImage, 10000);
});

function changeImage() {   
        // console.log(urls);
        var i = Math.floor(Math.random()*urls.length);
        $("body").css({"background-image": "url(" + urls[i] + ")", "background-repeat": "no-repeat","background-size":"cover","background-position":"right top","background-attachment": "fixed"});
}