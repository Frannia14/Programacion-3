"use strict";
const bAdd = document.querySelector('#bAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const expenses = new Expenses('USD');
loadAPI();
bAdd.addEventListener('click', () => {
    if (inputTitle.value !== '' && inputCost.value !== '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = inputCurrency.value;
        expenses.add({ title, cost: { amount: cost, currency } });
        render();
    }
    else {
        alert('Completa los datos correctamente');
    }
});
function loadAPI() {
    fetch('api/api.json')
        .then(res => res.json())
        .then(json => {
        const items = json.items;
        items.forEach(item => expenses.add(item));
        render();
    })
        .catch(error => console.error('Error loading API:', error));
}
function render() {
    let html = '';
    expenses.expenses.forEach(item => {
        const { id, title, cost } = item;
        html += `
            <div class="item">
                <div><span class="currency">${cost.currency}</span> ${cost.amount}</div>
                <div>${title}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
            </div>
        `;
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    document.querySelectorAll('.bEliminar').forEach(bEliminar => {
        bEliminar.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            if (id) {
                expenses.remove(parseInt(id));
                render();
            }
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
