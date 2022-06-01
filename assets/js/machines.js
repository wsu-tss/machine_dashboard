import { API_ENDPOINT } from './config.js';
import { byUsage } from './utils.js';
import { apiData } from './utils.js';
import { generateMachineTable } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
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

        // calling apiData to structure the data from the XML response
        let machineData = apiData(xmlDoc);

        // Formatting the data into table for display
        let machineTable = generateMachineTable(machineData);

        // Sorting the table
        machineTable.sort(byUsage);

        // Creating a table
        let table = document.getElementById("machineList");

        // Adding to the table
        for (let i = 0; i < machineTable.length; i++) {
            // Adds a row at the bottom
            let row = table.insertRow(-1);

            // Creating respective cells
            let serialNumber = row.insertCell(0);
            let machineName = row.insertCell(1);
            let machineType = row.insertCell(2);
            let machineHours = row.insertCell(3);
            let machineLogins = row.insertCell(4);
            let machineLocation = row.insertCell(5);

            // Adding values to the table cells
            serialNumber.innerHTML = i+1;
            machineName.innerHTML = machineTable[i]["machineName"];
            machineType.innerHTML = machineTable[i]["machineType"];
            machineHours.innerHTML = machineTable[i]["machineHours"];
            machineLogins.innerHTML = machineTable[i]["machineLogins"];
            machineLocation.innerHTML = machineTable[i]["machineLocation"];
        }
    }
});
