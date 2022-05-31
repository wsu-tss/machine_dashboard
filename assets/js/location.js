import { API_ENDPOINT } from './config.js';
import { byUsage } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    let location = document.getElementById("api_name");
    let locationName = location.textContent;

    let parser = new DOMParser();
    let request = new XMLHttpRequest();
    request.open("GET", API_ENDPOINT);
    request.send();
    request.onload = () => {
        let xmlDoc = parser.parseFromString(request.response, "text/xml");

        // Checking if there was an error
        if (request.status != 200) {
            console.log(`error ${request.status} ${request.statusText}`)
        }
        // Reading the root of XML
        let institute = xmlDoc.getElementsByTagName("site")[0];

        // All the locations (e.g. Kingswood, PEIH)
        let locations = institute.getElementsByTagName("site");

        // Creating an object
        let machineTable = [];

        // iterating over the locations
        for (let i = 0; i < locations.length; i++){
            let siteName = locations[i].getElementsByTagName("name")[0].firstChild.nodeValue;

            // Checking if the site name is the same as the page (i.e. Only machines from Kingswood campus for Kingswood page)
            if (siteName == locationName) {
                // root of the equipment for a location (site)
                let equipment = locations[i].getElementsByTagName("equipment")[0];

                // Extracting all the equipment Id
                let equipmentId = equipment.getElementsByTagName("equipid");

                // Extracting all the equipment type
                let equipmentType = equipment.getElementsByTagName("equiptype");

                // iterating over the equipment
                for (let j = 0; j < equipmentId.length; j++){
                    let eqId = equipmentId[j].firstChild.nodeValue;
                    let eqType = equipmentType[j].firstChild.nodeValue;

                    // Machine logs
                    let logs = equipment.getElementsByTagName("logs")[j];

                    // Getting all the login for a machine
                    let logins = logs.getElementsByTagName("login");

                    // Stores the machine usage time
                    let usageTime = 0;

                    for (let k = 0; k < logins.length; k++) {
                        // Getting duration from each login
                        let duration = parseInt(logins[k].getElementsByTagName("duration")[0].firstChild.nodeValue);

                        // Incrementing total usage time
                        usageTime += duration;
                    }

                    // Converting from minutes to hours
                    let usageHours = Number((usageTime/60).toFixed(2));

                    // Calculating the number of times users have used a machine 
                    let loginTimes = logins.length;

                    // Adding data to the table object
                    machineTable.push({"machineName": eqId, "machineType": eqType, "machineHours": usageHours, "machineLogins": loginTimes})
                }
            }
        }

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

            // Adding values to the table cells
            serialNumber.innerHTML = i+1;
            machineName.innerHTML = machineTable[i]["machineName"];
            machineType.innerHTML = machineTable[i]["machineType"];
            machineHours.innerHTML = machineTable[i]["machineHours"];
            machineLogins.innerHTML = machineTable[i]["machineLogins"];
        }
    }
});
