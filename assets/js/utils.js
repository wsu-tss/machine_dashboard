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

/**
* Utility function that takes an Array object and returns a set of operators.
* @param {Array} machineData - Array of the machine data.
*/
export function getOperatorsList(machineData) {
    let operators = new Set();

    // iterating over the locations
    for (let i = 0; i < machineData.length; i++) {
        // iterating over the equipment
        for (let j = 0; j < machineData[i]["equipment"].length; j++) {
            // Iterating the logs
            for (let k = 0; k < machineData[i]["equipment"][j]["logs"].length; k++) {
                let operatorId = machineData[i]["equipment"][j]["logs"][k]["operator"];
                operators.add(operatorId);
            }
        }
    }
    return operators;
}

/**
* Utility function that returns an array of colors .
*/
function generateRandomColors() {
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
* Utility function that returns an array of colors.
* @param {Int} count - Size of the array
*/
function getChartColors(count) {
    let chartColors = [];

    for (let i = 0; i < count; i++) {
        chartColors.push(generateRandomColors());
    }
    return chartColors;
}

/**
* Utility function that returns an array of colors.
* @param {String} chartName - ChartID in DOM.
* @param {String} siteName - Name of the campus
* @param {Array} xValues - Labels of the pie chart
* @param {Array} yValues - Values of the pie chart
*/
export function makeChart(chartName, siteName, xValues, yValues) {
    new Chart("machineUsage", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: getChartColors(xValues.length),
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: `Machine Usage in ${siteName}`
            }
        }
    });
}

/**
* Utility function that returns the logs of the given machine.
* @param {Array} machineData - Array of all the data for machines on all campuses.
* @param {Array} sites - Array of campus sites.
* @param {String} machineName - Machine whose logs are requested.
*/
export function getMachineLogs(machineData, site, machineName) {
    let allLogs = [];

    // console.log(site);
    machineData.forEach((campusData, index) => {
        // console.log(campusData["name"]);
        if (site == campusData["name"]){
            let machines = campusData["equipment"];

            machines.forEach((machine, index) => {
                if (machineName == machine["equipid"]){
                    allLogs.push(machine["logs"]);
                }
            });
        }
    });

    return allLogs[0];
}

/**
* Utility function that returns the total number of hours used by a machine.
* @param {Array} machineLogs - Array of all the logs for a machine.
*/
export function getMachineHours(machineLogs) {
    let machineHours = 0;

    if (machineLogs) {
        machineLogs.forEach((log, index) => {
            let duration = parseInt(log["duration"]);
            machineHours += duration;
        });
    }

    return machineHours;
}
