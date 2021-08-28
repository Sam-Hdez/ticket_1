function newBudget(element_id) {
    let inicio = document.getElementById(element_id);
    let proyecto = document.getElementById('crearProyecto');
    let newBudgetButton = document.getElementById('newBudgetButton');
    if (inicio.style.display != 'block') {
        inicio.style.display = 'block';
        proyecto.style.display = 'block';
        newBudgetButton.setAttribute('disabled', true);
    }
}

function editBudgetShowMenu(element_id) {
    let submenu = document.getElementById(element_id);

    document.getElementById('crearProyecto').style.display = 'block';

    if (submenu.style.display == 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}

function advanceTo(before, from, to) {
    let pageAnt = document.getElementById(before);
    console.log(pageAnt);
    let pageInit = document.getElementById(from);
    let pageSig = document.getElementById(to);

    if (pageAnt == null) {
        pageInit.style.display = 'block';
    }

    pageInit.style.display = 'none';
    pageSig.style.display = 'block';
}

window.onload = load;