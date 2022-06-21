import { API_ENDPOINT } from './config.js';
import { byUsage } from './utils.js';
import { apiData } from './utils.js';
import { generateMachineTable } from './utils.js';
import { makeChart } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Getting the site name from the html DOM element
    let site = document.getElementById("api_name");
    let siteName = site.textContent;

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
        // Reading the root of XML
        let institute = xmlDoc.getElementsByTagName("site")[0];

        // All the locations (e.g. Kingswood, PEIH)
        let locations = institute.getElementsByTagName("site");

        // Calling apiData to structure the data from XML
        let machineData = apiData(xmlDoc);

        // Formatting the data into table for display
        let machineTable = generateMachineTable(machineData, siteName);

        // Sorting the table
        machineTable.sort(byUsage);

        // Creating a table
        let table = document.getElementById("machineList");

        // chart variables
        let xValues = [];
        let yValues = [];

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

            // Adding values to the table cells
            serialNumber.innerHTML = i+1;
            // machineName.innerHTML = machineTable[i]["machineName"];
            let machineLink = document.createElement('a');

            // Creating the path for individual machines
            // Removing the spaces from the machine.
            // make sure that the collections have the same name as the machines
            // ../machines/ indicate going one level above in the page hierarchy
            // Going a level up is not required in all machines page.
            let pageName = "../machines/" + machineTable[i]["machineName"].replace(/\s/g, '') + ".html";

            // Setting up the path to the table attribute
            machineLink.setAttribute("href", pageName);

            // Creating element to enter the machine name
            let machine = document.createElement('div');
            machine.innerHTML = machineTable[i]["machineName"];

            machineLink.appendChild(machine);
            machineName.appendChild(machineLink);
            machineType.innerHTML = machineTable[i]["machineType"];
            machineHours.innerHTML = machineTable[i]["machineHours"];
            machineLogins.innerHTML = machineTable[i]["machineLogins"];

            // Storing values for pie chart
            xValues.push(machineTable[i]["machineName"]);
            yValues.push(machineTable[i]["machineHours"]);
        }

        // Calling function to make chart
        makeChart("machineUsage", siteName ,xValues, yValues);
    }
});
