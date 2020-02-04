var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var quote_response = JSON.parse(xhttp.responseText);
       
       console.log(quote_response)
       content.innerHTML = quote_response.value.joke;
       var loader = document.getElementById("loader");
       loader.style.display = "none";
       content.style.display = "block";
    }
};

var reload = ()=> {
    var content = document.getElementById("content");
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    content.style.display = "none";
    xhttp.open("GET", " ", true); // add api here + authorization
    xhttp.send(); 
}

$(document).ready(function(){ 
    reload();
});