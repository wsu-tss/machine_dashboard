export function byUsage(a, b) {
    // Sorting in descending order
    return parseInt(b.machineHours) - parseInt(a.machineHours);
}

export function apiData(xmlDoc) {
    /**
    * Utility function that takes XML file and restructures data in an Array.
    * @xmlDoc {Array} - XML data.
    */
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
