import { API_ENDPOINT } from './config.js';
import { sites } from './config.js';
import { apiData } from './utils.js';
import { generateMachineTable } from './utils.js';
import { getMachineLogs } from './utils.js';
import { getMachineHours } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    let machineName = document.getElementById("machineName").textContent;

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

        let machineData = apiData(xmlDoc);
        let totalHours = document.getElementById("totalHours");

        let allMachineHours = 0;

        sites.forEach((site, index) => {
            let machineLogs = getMachineLogs(machineData, site, machineName);

            // Creating table

            // using site as an ID for the table
            let table = document.getElementById(site);

            if (machineLogs) {
                machineLogs.forEach((log, index) => {
                    let row = table.insertRow(-1);

                    // Creating respective cells
                    let timestamp = row.insertCell(0);
                    let operator = row.insertCell(1);
                    let duration = row.insertCell(2);

                    timestamp.innerHTML = log["timestamp"];
                    operator.innerHTML = log["operator"];
                    duration.innerHTML = log["duration"];
                });
            }
            
            // calculates machine hours for both the campus
            allMachineHours += getMachineHours(machineLogs);

        });
        totalHours.innerHTML = Number((allMachineHours/60).toFixed(2));
    }
});
