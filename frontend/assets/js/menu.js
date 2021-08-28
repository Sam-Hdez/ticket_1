/* PETICION AJAX */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'nav.html');
xhr.setRequestHeader('Content-Type', 'text/plain');
xhr.send();
xhr.onload = function(data) {
    document.querySelector("#nav").innerHTML = data.currentTarget.response;
};
/* PETICION AJAX */

async function menu_load() {
    console.log('Elementos adicionales en menu');
    let status_session = await ConfirmLogin();
    if (status_session.admin != undefined && status_session.admin === true) {
        document.getElementById('ListUsers').innerHTML = `<a href="./users-list.html" class="nav-link text-white">
            <i class="fas fa-users bi d-block mx-auto mb-1"></i> <span class="text-small">Usuarios del sistema</span>
        </a>`;
    }
}