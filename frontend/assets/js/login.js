async function login(email, password) {
    let usuario = { email: email, password: password };
    console.log(usuario)
    const apiCall = await getData(`user/login`, 'POST', JSON.stringify(usuario), {
        "Accept": "*/*",
        "Content-type": 'application/json',
    });

    const response = await apiCall;

    if (response.token == undefined) {
        //Joi provoca errores con atributo error
        if (response.error) {
            throw new Error(response.error);
        }

        throw new Error(response.message);
    }

    return response.token;
}

async function validateForm(event) {
    try {
        event.preventDefault();
        document.getElementById('message-login').innerHTML = ''
        const email = document.getElementById('inputEmail').value;
        const pass = document.getElementById('inputPassword').value;

        console.log(email + pass);

        Login.guardarUsuario(new Login(email, pass));
        const resultado = await login(email, pass);

        console.log('Token generado en el login: ', resultado);
        Login.guardarUsuario(resultado);
        if (resultado) {
            location.href = "profile.html";
        }
    } catch (error) {
        document.getElementById('inputEmail').classList.add('error-login');
        document.getElementById('inputPassword').classList.add('error-login');

        document.getElementById('message-login').innerHTML = `<div class="alert alert-warning alert-dismissible fade show text-sm-start" role="alert">` +
            `${error.message}` +
            `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>` +
            `</div>`;
    }
}

async function load() {
    //Durante el tiempo que el JWT este activo login redireccionará a index.
    console.log('Entrando durante ONLOAD');
    let status_session = await ConfirmLogin();
    if (status_session.status != undefined) {
        location.href = "profile.html";
    }
}

window.onload = load;