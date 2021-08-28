const protocol = 'http';
const domain = '127.0.0.1';
const host = `${protocol}://${domain}`;
const port = 3000;
const baseURL = `${host}:${port}/`;

class mainServices {
    async makeFech(uri, method_service, body_service, headers_service = {}) {
        try {
            //console.log(body_service);
            let data;

            const request = {
                method: method_service,
                headers: headers_service,
            }

            if (method_service != 'GET' && body_service != {}) {
                request.body = body_service;
            }

            data = await fetch(`${baseURL}${uri}`, request);

            return await data.json();
        } catch (e) {
            throw new Error(`Error al hacer fetch a ${baseURL}${uri}. \nERROR: ${e.message}`);
        }
    }
}

class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.token = "";
    }

    static async guardarUsuario(usuario) {
        localStorage.setItem("userInSession", JSON.stringify(usuario));
    }

    static async recuperarUsuario() {
        let user = await JSON.parse(localStorage.getItem("userInSession"));
        return user;
    }
}

async function getData(uri, method, body, headers) {
    try {
        const service = new mainServices();
        return service.makeFech(uri, method, body, headers);
    } catch (e) {
        throw new Error(e.message);
    }
}

const ConfirmLogin = async() => {
    const token = await Login.recuperarUsuario();

    const apiCall = await getData(`user/checkSession`, 'GET', {}, {
        "Accept": "*/*",
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
    });

    const response = await apiCall;

    return response;
}

/* CERRAR SESIÓN */
function CerrarSession() {
    if (localStorage.getItem('userInSession')) {
        console.log('Cerrando sesion')
        localStorage.removeItem('userInSession')
        location.href = "index.html";
    } else {
        alert('No ha iniciado sesión');
    }
}
/* CERRAR SESIÓN */

async function load() {
    console.log('Revisión del status de sesión y carga de elementos adicionales.');
    let status_session = await ConfirmLogin();
    if (status_session.status == undefined) {
        location.href = "index.html";
    }

    await menu_load();
}