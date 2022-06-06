// GRAB INPUT
// PASS TO CREATE TABLE ROW
// APPEND TABLE ROW

const form = document.querySelector('#form');

function setupEventListerner(form: HTMLTableElement | null) {
  if (form === null) {
    return;
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formValues: FormValues = getFormValues();
    const tableRow: HTMLTableRowElement = createTableRow(formValues);
    const tableBody: HTMLTableElement | null = document.querySelector('#table');
    if (tableBody === null) {
      return;
    }
    tableBody.appendChild(tableRow);
  });
}

function getFormValues(): FormValues {
  const date: HTMLInputElement | null = document.querySelector('#date');
  const amount: HTMLInputElement | null = document.querySelector('#amount');
  const description: HTMLInputElement | null =
    document.querySelector('#description');
  if (!date || !amount || !description) {
    throw new Error();
  }
  return {
    date: date.value,
    amount: amount.value,
    description: description.value,
  };
}

interface FormValues {
  date: string;
  amount: string;
  description: string;
}

function createTableRow(formValues: FormValues): HTMLTableRowElement {
  const tr: HTMLTableRowElement = document.createElement('tr');

  const date: HTMLTableCellElement = document.createElement('td');
  date.textContent = formValues.date;
  const amount: HTMLTableCellElement = document.createElement('td');
  amount.textContent = formValues.amount;
  const description: HTMLTableCellElement = document.createElement('td');
  description.textContent = formValues.description;

  tr.appendChild(date);
  tr.appendChild(amount);
  tr.appendChild(description);

  const deleteButton: HTMLButtonElement = document.createElement('button');
  deleteButton.onclick = (e: Event) => {
    (e.target as HTMLButtonElement).parentElement.remove();
  };

  tr.appendChild(deleteButton);
  return tr;
}
