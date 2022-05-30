import { API_ENDPOINT } from './config.js';

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

                    // Creating a table
                    let table = document.getElementById("machineList");

                    // Adds a row at the bottom
                    let row = table.insertRow(-1);

                    // Creating respective cells
                    let serialNumber = row.insertCell(0);
                    let machineName = row.insertCell(1);
                    let machineType = row.insertCell(2);

                    // Adding values to the table cells
                    serialNumber.innerHTML = j+1;
                    machineName.innerHTML = eqId;
                    machineType.innerHTML = eqType;
                }
            }
        }
    }
});
