export function byUsage(a, b) {
    // Sorting in descending order
    return parseInt(b.machineHours) - parseInt(a.machineHours);
}

/**
* Utility function that takes XML file and restructures data in an Array.
* @param {Array} xmlDoc - XML data.
*/
export function apiData(xmlDoc) {
    let machineData = [];
    // Reading the root of XML
    let institute = xmlDoc.getElementsByTagName("site")[0];

    // All the locations (e.g. Kingswood, PEIH)
    let locations = institute.getElementsByTagName("site");

    // iterating over the locations
    for (let i = 0; i < locations.length; i++){
        // Name of the site e.g. Kingswood
        let siteName = locations[i].getElementsByTagName("name")[0].firstChild.nodeValue;

        // root of the equipment for a location (site)
        let equipment = locations[i].getElementsByTagName("equipment")[0];

        // Extracting all the equipment Id
        let equipmentId = equipment.getElementsByTagName("equipid");

        // Extracting all the equipment type
        let equipmentType = equipment.getElementsByTagName("equiptype");

        machineData.push({"name": siteName, "equipment": []});

        // iterating over the equipment
        for (let j = 0; j < equipmentId.length; j++){
            let eqId = equipmentId[j].firstChild.nodeValue;
            let eqType = equipmentType[j].firstChild.nodeValue;

            machineData[i]["equipment"].push({"equipid": eqId, "equiptype": eqType, "logs": []});

            // Machine logs
            let logs = equipment.getElementsByTagName("logs")[j];

            // Getting all the login for a machine
            let logins = logs.getElementsByTagName("login");

            for (let k = 0; k < logins.length; k++) {
                // Getting duration from each login
                let timestamp = logins[k].getElementsByTagName("timestamp")[0].firstChild.nodeValue;
                let operator = logins[k].getElementsByTagName("operator")[0].firstChild.nodeValue;
                let duration = parseInt(logins[k].getElementsByTagName("duration")[0].firstChild.nodeValue);

                try {
                    machineData[i]["equipment"][j]["logs"].push({"timestamp": timestamp, "operator": operator, "duration": duration});
                }
                catch(err) {
                    console.log(err.message);
                }
            }
        }
    }
    return machineData;
}


/**
* Utility function that takes XML file and restructures data in an Array.
* @param {Array} machineData - Array of the machine data.
* @param {String} siteName - Optional argument for filtering machines by location.
*/
export function generateMachineTable(machineData, siteName) {
    // Creating an object
    let machineTable = [];

    // Iterates over the location
    for (let i = 0; i < machineData.length; i++) {
        let locationName = machineData[i]["name"];

        if (siteName !== undefined) {
            if (locationName == siteName) {
                // Iterates over the equipment at a location
                for (let j = 0; j < machineData[i]["equipment"].length; j++) {
                    let machineName = machineData[i]["equipment"][j]["equipid"];
                    let machineType = machineData[i]["equipment"][j]["equiptype"];

                    let usageTime = 0;

                    // Iterates over the logs of the equipment
                    for (let k = 0; k < machineData[i]["equipment"][j]["logs"].length; k++) {
                        // Calculate the duration
                        let duration = parseInt(machineData[i]["equipment"][j]["logs"][k]["duration"]);
                        usageTime += duration;
                    }

                    let usageHours = Number((usageTime/60).toFixed(2));

                    let loginTimes = machineData[i]["equipment"][j]["logs"].length;

                    machineTable.push({"machineName": machineName, "machineType": machineType, "machineHours": usageHours, "machineLogins": loginTimes, "machineLocation": locationName});
                }
            }
        } else {
            // Iterates over the equipment at a location
            for (let j = 0; j < machineData[i]["equipment"].length; j++) {
                let machineName = machineData[i]["equipment"][j]["equipid"];
                let machineType = machineData[i]["equipment"][j]["equiptype"];

                let usageTime = 0;

                // Iterates over the logs of the equipment
                for (let k = 0; k < machineData[i]["equipment"][j]["logs"].length; k++) {
                    // Calculate the duration
                    let duration = parseInt(machineData[i]["equipment"][j]["logs"][k]["duration"]);
                    usageTime += duration;
                }

                let usageHours = Number((usageTime/60).toFixed(2));

                let loginTimes = machineData[i]["equipment"][j]["logs"].length;

                machineTable.push({"machineName": machineName, "machineType": machineType, "machineHours": usageHours, "machineLogins": loginTimes, "machineLocation": locationName});
            }
        }
    }
    return machineTable;
}
