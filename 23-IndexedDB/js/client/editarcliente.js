import { validateCompany, validateEmail, validateName, validateNewClient, validatePhone, getQueryParam } from "../funciones.js";
import { clientStore } from "../api/indexedDB/indexedDBManager.js";

const form = document.querySelector("#formulario");
const submitButton = document.querySelector('#formulario input[type="submit"]');
const nameInput = document.querySelector("#nombre");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#telefono");
const companyInput = document.querySelector("#empresa");

const email = getQueryParam('email');
let client;

// Event Listeners -----------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
    await loadClientData();
    loadEventListeners();
    setPlaceHolders();
    toggleSubmit();
});

async function loadClientData() {
    client = await clientStore.getById(email);
    if (client) {
        setFields();
    } else {
        console.error('Client not found');
    }
}

function loadEventListeners() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await clientStore.update(client);
        alert("Client successfully updated");
    });

    nameInput.addEventListener("input", (e) => {
        client.name = validateName(e.target.value);
        if (client.name) {
            removeAlert(e);
        } else {
            removeAlert(e);
            nameInput.parentElement.appendChild(createAlert(e));
        }
        toggleSubmit();
    });

    emailInput.addEventListener("input", (e) => {
        client.email = validateEmail(e.target.value);
        if (client.email) {
            removeAlert(e);
        } else {
            removeAlert(e);
            emailInput.parentElement.appendChild(createAlert(e));
        }
        toggleSubmit();
    });

    phoneInput.addEventListener("input", (e) => {
        client.phone = validatePhone(e.target.value);
        if (client.phone) {
            removeAlert(e);
        } else {
            removeAlert(e);
            phoneInput.parentElement.appendChild(createAlert(e));
        }
        toggleSubmit();
    });

    companyInput.addEventListener("input", (e) => {
        client.company = validateCompany(e.target.value);
        if (client.company) {
            removeAlert(e);
        } else {
            removeAlert(e);
            companyInput.parentElement.appendChild(createAlert(e));
        }
        toggleSubmit();
    });
}

// Manipulate HTML -----------------------------------------------------------------------------------------------------

function createAlert(event) {
    const alert = document.createElement("div");
    alert.className = 'text-sm text-red-600 bg-red-100 p-2 rounded mt-1';
    alert.id = `${event.target.id}-alert`;
    alert.setAttribute('role', 'alert');
    alert.textContent = `Invalid`;

    return alert;
}

function removeAlert(event) {
    const alert = document.querySelector(`#${event.target.id}-alert`);
    alert ? alert.remove() : null;
}

function setPlaceHolders() {
    if (client) {
        nameInput.placeholder = client.name || 'Enter name';
        emailInput.placeholder = client.email || 'Enter email';
        phoneInput.placeholder = client.phone || 'Enter phone number';
        companyInput.placeholder = client.company || 'Enter company';
    }
}

function setFields() {
    if (client) {
        nameInput.value = client.name || '';
        emailInput.value = client.email || '';
        phoneInput.value = client.phone || '';
        companyInput.value = client.company || '';
    }
}

function toggleSubmit() {
    if (validateNewClient(client)) {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#38b2ac';
        submitButton.style.opacity = '1';
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#b3b3b3';
        submitButton.style.opacity = '0.6';
    }
}
