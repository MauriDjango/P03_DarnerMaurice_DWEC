const fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^(?:\+34\s?)?([6789]\d{8})$/;
const companyNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9&.,'\- ]+$/;


export function validateNewClient(clientObj) {
    return Object.values(clientObj).includes("") ? null : clientObj
}

export function validateName(name) {
    return fullNameRegex.test(name) ? name : ''
}

export function validateEmail(email) {
    return emailRegex.test(email) ? email : ''
}

export function validatePhone(phone) {
    return phoneNumberRegex.test(phone) ? phone : ''
}

export function validateCompany(company) {
    return companyNameRegex.test(company) ? company : ''
}

export function getQueryParam(param) {
    const url = new URL(window.location.href); // Get the current URL
    return url.searchParams.get(param); // Get the value of the specified parameter
}
