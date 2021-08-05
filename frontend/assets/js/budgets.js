function newBudget(element_id) {
    let inicio = document.getElementById(element_id);
    let proyeto = document.getElementById('crearProyecto');
    if (inicio.style.display == 'block') {
        inicio.style.display = 'none';
        proyeto.style.display = 'none';
    } else {
        inicio.style.display = 'block';
        proyeto.style.display = 'block';
    }
}