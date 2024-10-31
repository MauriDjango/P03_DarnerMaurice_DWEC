import {validateCompany, validateEmail, validateName, validateNewClient, validatePhone} from "../funciones.js";
import {clientStore} from "../api/indexedDB/indexedDBManager.js";

const form = document.querySelector("#formulario");
const submitButton = document.querySelector('#formulario input[type="submit"]');
const nameInput = document.querySelector("#nombre");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#telefono");
const companyInput = document.querySelector("#empresa");

const newClient = {
    name: "",
    email: "",
    phone: "",
    company: ""
}

// Event Listeners -----------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    loadEventListeners()
    resetFields()
    toggleSubmit()

    newClient.name = ''
    newClient.email = ''
    newClient.phone = ''
    newClient.company = ''
})

function loadEventListeners() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        try {
            await clientStore.add(newClient)
        } catch (error) {
            alert('Email is already registered')
        }
    })

    nameInput.addEventListener("input", (e) => {
        newClient.name = validateName(e.target.value);
        if (newClient.name) {
            removeAlert(e)
        } else {
            removeAlert(e)
            nameInput.parentElement.appendChild(createAlert(e))
        }
        toggleSubmit()
    })

    emailInput.addEventListener("input", (e) => {
        newClient.email = validateEmail(e.target.value)
        if (newClient.email) {
            removeAlert(e)
        } else {
            removeAlert(e)
            emailInput.parentElement.appendChild(createAlert(e))
        }
        toggleSubmit()
    })

    phoneInput.addEventListener("input", (e) => {
        newClient.phone = validatePhone(e.target.value)
        if (newClient.phone) {
            removeAlert(e)
        } else {
            removeAlert(e)
            phoneInput.parentElement.appendChild(createAlert(e))
        }
        toggleSubmit()
    })

    companyInput.addEventListener("input", (e) => {
        newClient.company = validateCompany(e.target.value)
        if (newClient.company) {
            removeAlert(e)
        } else {
            removeAlert(e)
            companyInput.parentElement.appendChild(createAlert(e))
        }
        toggleSubmit()
    })
}

// Manipulate HTML -----------------------------------------------------------------------------------------------------

function createAlert(event) {
    const alert = document.createElement("div")
    alert.className = 'text-sm text-red-600 bg-red-100 p-2 rounded mt-1';
    alert.id = `${event.target.id}-alert`
    alert.setAttribute('role', 'alert');
    alert.textContent = `Invalid`;

    return alert
}

function removeAlert(event) {
    const alert = document.querySelector(`#${event.target.id}-alert`);
    alert ?
        alert.remove() :
        null
}

function resetFields() {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    companyInput.value = "";
}

function toggleSubmit() {
    if (validateNewClient(newClient)) {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#38b2ac';
        submitButton.style.opacity = '1';
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#b3b3b3';
        submitButton.style.opacity = '0.6';
    }
}
