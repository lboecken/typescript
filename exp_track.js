"use strict";
// GRAB INPUT
// PASS TO CREATE TABLE ROW
// APPEND TABLE ROW
const form = document.querySelector('#form');
function setupEventListerner(form) {
    if (form === null) {
        return;
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formValues = getFormValues();
        const tableRow = createTableRow(formValues);
        const tableBody = document.querySelector('#table');
        if (tableBody === null) {
            return;
        }
        tableBody.appendChild(tableRow);
    });
}
function getFormValues() {
    const date = document.querySelector('#date');
    const amount = document.querySelector('#amount');
    const description = document.querySelector('#description');
    if (!date || !amount || !description) {
        throw new Error();
    }
    return {
        date: date.value,
        amount: amount.value,
        description: description.value,
    };
}
function createTableRow(formValues) {
    const tr = document.createElement('tr');
    const date = document.createElement('td');
    date.textContent = formValues.date;
    const amount = document.createElement('td');
    amount.textContent = formValues.amount;
    const description = document.createElement('td');
    description.textContent = formValues.description;
    tr.appendChild(date);
    tr.appendChild(amount);
    tr.appendChild(description);
    const deleteButton = document.createElement('button');
    deleteButton.onclick = (e) => {
        e.target.parentElement.remove();
    };
    tr.appendChild(deleteButton);
    return tr;
}
