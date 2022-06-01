import { API_ENDPOINT } from './config.js';
import { apiData } from './utils.js';
import { getOperatorsList } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Todo
    let totalOperators = document.getElementById("totalOperators");
    // let operators = new Set();

    let parser = new DOMParser();
    let request = new XMLHttpRequest();
    request.open("GET", API_ENDPOINT);
    request.send();
    request.onload = () => {
        let xmlDoc = parser.parseFromString(request.response, "text/xml");

        // Checking if there was an error
        if (request.status != 200) {
            console.log(`error ${request.status} ${request.statusText}`);
        }

        // Get machine data in a structured format
        let machineData = apiData(xmlDoc);

        // Get a Set object of operators
        let operators = getOperatorsList(machineData);

        // Adds the total number of operators in the DOM element
        totalOperators.textContent = operators.size;

        let operatorTable = document.getElementById("operatorList");

        let counter = 0;
        operators.forEach(operator => {
            // Counter for serial number
            counter++;

            // Add row at the bottom
            let row = operatorTable.insertRow(-1);

            // Creating cells
            let serialNumber = row.insertCell(0);
            let machineOperator = row.insertCell(1);

            // Adding values to the table
            serialNumber.innerHTML = counter;
            machineOperator.innerHTML = operator;
        });
    }
});
