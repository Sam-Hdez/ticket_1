const ListUsers = async() => {
    const token = await Login.recuperarUsuario();
    const response = await getData(`user/list-user`, 'GET', {}, {
        "Accept": "*/*",
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
    });

    return response;
}

async function CreateUser(first_name, last_name, email, password) {
    let usuario = { first_name: first_name, last_name: last_name, email: email, password: password };
    //console.log(usuario)
    const response = await getData(`user/register`, 'POST', JSON.stringify(usuario), {
        "Accept": "*/*",
        "Content-type": 'application/json',
    });

    //console.log(response)

    if (response.error != undefined) {
        return response.error
    }

    return response.status
}

const UserDelete = async(data) => {
    const token = await Login.recuperarUsuario();
    const response = await getData(`user/delete/${data}`, 'DELETE', JSON.stringify({}), {
        "Accept": "*/*",
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
    });

    //console.log(response);
    return response;
}

const editUser = async(data, body) => {
    const token = await Login.recuperarUsuario();
    const response = await getData(`user/edit/${data}`, 'PUT', JSON.stringify(body), {
        "Accept": "*/*",
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
    });

    //console.log(response);
    return response;
}

async function loadList() {
    //console.log('Entrando ListUsers');
    let ArrayUser = await ListUsers();
    //console.log(ArrayUser)
    if (ArrayUser.error != undefined) {
        alert('Acceso no autorizado');
        location.href = "index.html";
    }
    let divToRender = document.getElementById('bodyTableUsers');
    let htmlUsers = '';
    ArrayUser.forEach(element => {
        let is_admin;
        if (element.is_admin === true) {
            is_admin = 'admin';
        } else {
            is_admin = 'usuario';
        }

        //console.log(element);
        let userString = escape(JSON.stringify(element));
        //console.log(userString);

        htmlUsers += '<tr>' +
            '<td>' + element.first_name + '</td>' +
            '<td>' + element.last_name + '</td>' +
            '<td>' + element.email + '</td>' +
            '<td>' + is_admin + '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-default btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalEditUser" data-bs-user="' + userString + '">Editar</button> ' +
            '<a class="btn btn-default btn-outline-dark" href="javascript:DeleteUser(\'' + element.user_id + '\')">Borrar</a> ' +
            '</td>' +
            '</tr>'
    });
    divToRender.innerHTML = htmlUsers;
}

loadList();


var modalEditUser = document.getElementById('modalEditUser')
modalEditUser.addEventListener('show.bs.modal', function(event) {
    //console.log('Dentro de edit');
    var button = event.relatedTarget;
    var recipient = JSON.parse(unescape(button.getAttribute('data-bs-user')));
    //console.log(recipient);
    var inputName = modalEditUser.querySelector('.modal-body input[id=editfirstName]');
    var userUnic = modalEditUser.querySelector('.modal-body input[id=UserUnic]');
    var inputApellido = modalEditUser.querySelector('.modal-body input[id=editlastName]');
    var inputEmail = modalEditUser.querySelector('.modal-body input[id=editemail]');
    var selectRol = modalEditUser.querySelector('.modal-body select[id=editrol]');

    //modalTitle.textContent = 'New message to ' + recipient
    userUnic.value = recipient.user_id;
    inputName.value = recipient.first_name;
    inputApellido.value = recipient.last_name;
    inputEmail.value = recipient.email;
    for (const option in selectRol.options) {
        if (Object.hasOwnProperty.call(selectRol.options, option)) {
            const option_select = selectRol.options[option];
            if (option_select.value == `${recipient.is_admin}`) {
                option_select.setAttribute('selected', true);
            }
        }
    }
})

async function DeleteUser(data) {
    const user = await UserDelete(data);
    if (user.status != undefined) {
        location.href = "users-list.html";
    }
}

async function SubmitEditUser(event) {
    event.preventDefault();
    const first_name = document.getElementById('editfirstName').value;
    const last_name = document.getElementById('editlastName').value;
    const is_admin = document.getElementById('editrol').value;
    const user = document.getElementById('UserUnic').value;
    const estructura = { "first_name": first_name, "last_name": last_name, "is_admin": is_admin };
    //console.log(estructura);
    let status = await editUser(user, estructura);
    //console.log(status);
    location.href = "users-list.html";
}

async function SubmitUser(event) {
    event.preventDefault();
    //console.log('Formulario de registro activado')
    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('password-confirm').value;

    //console.log(confirm_password != password);
    if (confirm_password != password) {
        document.getElementById('password').setAttribute("style", "border-color:red !important; background-image:none !important");
        document.getElementById('password-confirm').setAttribute("style", "border-color:red !important; background-image:none !important");
    } else {
        document.getElementById('password').removeAttribute('style');
        document.getElementById('password-confirm').removeAttribute('style');

        const userMessage = await CreateUser(first_name, last_name, email, password);

        document.getElementById('messagesInicio').innerHTML = '<div class="text-center p-4">' + userMessage + '</div>';
    }
}

window.onload = load;