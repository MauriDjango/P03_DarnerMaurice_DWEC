import {clientStore} from "./api/indexedDB/indexedDBManager.js";

const clientTable = document.querySelector('#listado-clientes')


document.addEventListener('DOMContentLoaded', () => {
    loadClients()
})

// Manipulate HTML -----------------------------------------------------------------------------------------------------

async function loadClients() {
    try {
        const clients = await clientStore.getAll();
        clientTable.innerHTML = ''
        clients.forEach(client => {
            clientTable.appendChild(createClientRow(client))
        })

    } catch (error) {
        console.error('Failed to load clients:', error);
    }
}

// Create HTML elements ------------------------------------------------------------------------------------------------

function createClientRow(client) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.className = "px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600";
    nameCell.textContent = client.name;

    const phoneCell = document.createElement('td');
    phoneCell.className = "px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600";
    phoneCell.textContent = client.phone;

    const companyCell = document.createElement('td');
    companyCell.className = "px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600";
    companyCell.textContent = client.company;

    const actionsCell = document.createElement('td');
    actionsCell.className = "px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 p-4";

    const editLink = document.createElement('a');
    editLink.textContent = 'Edit';
    editLink.className = "text-teal-600 hover:text-teal-900 m-1";
    editLink.href = `editar-cliente.html?email=${encodeURIComponent(client.email)}`;


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = "text-red-600 hover:text-red-900 m-1";
    deleteButton.onclick = async () => {
        await clientStore.delete(client.email)
        await loadClients()
    };

    actionsCell.appendChild(editLink);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(phoneCell);
    row.appendChild(companyCell);
    row.appendChild(actionsCell);

    return row;
}


