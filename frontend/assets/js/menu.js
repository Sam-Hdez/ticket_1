/* PETICION AJAX */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'nav.html');
xhr.setRequestHeader('Content-Type', 'text/plain');
xhr.send();
xhr.onload = function(data) {
    document.querySelector("#nav").innerHTML = data.currentTarget.response;
};
/* PETICION AJAX */