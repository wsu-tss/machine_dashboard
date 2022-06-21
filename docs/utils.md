# Utils

This docs explains all the functions present in [utils](assets/js/utils.js).

## Sorting methods

### Sort by machine usage hours

```
[Object].sort(byUsage);
```

Takes `machineHours` property of the machine object and sorts them in descending order.

**Example**:
```
let machineTable = [{"machineName": "Epilog Fusion 40", "machineType": "laser", "machineHours": 100, "machineLogins": 21, "machineLocation": "Kingswood"}, {"machineName": "Belt Sander", "machineType": "honing", "machineHours": 50, "machineLogins": 5, "machineLocation": "Kingswood"}]

machineTable.sort(byUsage);
```

### Sort by date

```
[Object].sort(sortLogsByDate);
```

Sorts the logs in descending order by date.


**Example**:

```
let machineLogs = [{timestamp: '14/04/22 00:16:23', operator: '069184D4', duration: 0}, {timestamp: '13/04/22 06:01:34', operator: 'A061A400', duration: 14}, {timestamp: '06/04/22 23:19:31', operator: 'A061A400', duration: 99}, {timestamp: '06/04/22 02:02:58', operator: 'A061A400', duration: 190}, {timestamp: '30/03/22 00:10:49', operator: 'A061A400', duration: 12}]

machineLogs.sort(sorLogsByDate);
```

## Get API data

```
/**
* Utility function that takes XML file and restructures data in an Array.
* @param {Array} xmlDoc - XML data.
*/
```

Takes XML input and returns an Array of Objects.

**Example**:

```
let parser = new DOMParser();
let request = new XMLHttpRequest();
request.open("GET", API_ENDPOINT);
request.send();
request.onload = () => {
    let xmlDoc = parser.parseFromString(request.response, "text/xml");

    let machineData = apiData(xmlDoc);
}
```

The return value is as follows:

```
[
    {
        name: "Kingswood",
        equipment: [
            {
                equipid: "Epilog Fusion 40",
                equiptype: "laser",
                logs: [
                    {
                        timestamp: "14/04/22 00:16:23",
                        operator: "00000000",
                        duration: 0
                    },
                    {
                        timestamp: "14/04/22 02:16:23",
                        operator: "00000001",
                        duration: 14
                    }
                ]
            },
            {
                equipid: "Belt Sander",
                equiptype: "honing",
                logs: [
                    {
                        timestamp: "14/04/22 00:16:23",
                        operator: "00000000",
                        duration: 0
                    },
                    {
                        timestamp: "14/04/22 02:16:23",
                        operator: "00000001",
                        duration: 14
                    }
                ]
            }
        ]
    },
    {
        name: "PEIH",
        equipment: [
            {
                equipid: "Epilog Fusion 40",
                equiptype: "laser",
                logs: [
                    {
                        timestamp: "14/04/22 00:16:23",
                        operator: "00000000",
                        duration: 0
                    },
                    {
                        timestamp: "14/04/22 02:16:23",
                        operator: "00000001",
                        duration: 14
                    }
                ]
            }
        ]
    }
]
```

## Generate Machine Table

```
/**
* Utility function that takes XML file and restructures data in an Array.
* @param {Array} machineData - Array of the machine data.
* @param {String} siteName - Optional argument for filtering machines by location.
*/
```

Generates an Array of Objects used for making tables in HTML.

**Example**:

```
// Refer to apiData function to see how machineData is generated
let machineData = apiData(xmlDoc);

let machineTable = generateMachineTable(machineData);
```

This should give the following results:

```
[
    {
        machineName: "Epilog Fusion 40",
        machineType: "laser",
        machinehours: 122,
        machineLogins: 100,
        machineLocation: "Kingswood"
    },
    {
        machineName: "Belt Sander",
        machineType: "honing",
        machinehours: 12,
        machineLogins: 12,
        machineLocation: "Kingswood"
    }
]
```

## Generate operators list

```
/**
* Utility function that takes an Array object and returns a set of operators.
* @param {Array} machineData - Array of the machine data.
*/
```

Generates the list of operators by collecting information from the machine logs.


**Example**:

```
// Refer to apiData function to see how machineData is generated
let machineData = apiData(xmlDoc);

let operators = getOperatorsList(machineData);
```

This returns the following:

```
{'00000000', '00000001', '00000002'}
```

## Machine Logs

```
/**
* Utility function that returns the logs of the given machine.
* @param {Array} machineData - Array of all the data for machines on all campuses.
* @param {Array} sites - Array of campus sites.
* @param {String} machineName - Machine whose logs are requested.
*/
```

Gets the logs for the requested machine.

**Example**:

```
let machineLogs = getMachineLogs(machineData, site, machineName)
```

This returns the following:

```
[
    {
        timestamp: '14/04/22 00:16:23',
        operator: '069184D4',
        duration: 0
    },
    {
        timestamp: '13/04/22 06:01:34',
        operator: 'A061A400',
        duration: 14
    }
]
```

## Machine Hours

```
/**
* Utility function that returns the total number of hours used by a machine.
* @param {Array} machineLogs - Array of all the logs for a machine.
*/
```

Returns the total usage time of machines in minutes.

**Example**:

```
// Refer to getMachineLogs() function docs
let machineLogs = getMachineLogs(machineData, site, machineName)

let machineHours = getMachineHours(machineLogs);
```

## Chart functions

```
/**
* Utility function that returns an array of colors.
* @param {String} chartName - ChartID in DOM.
* @param {String} siteName - Name of the campus
* @param {Array} xValues - Labels of the pie chart
* @param {Array} yValues - Values of the pie chart
*/
```

Uses `chart.js` library to make a pie chart to show machine usage as per hours.

**Example**:

```
let xValues = ["Epilog Fusion 40", "Belt Sander", "Bench Grinder"];
let yValues = [10, 20, 30];

makeChart("machineUsage", "WSU" ,xValues, yValues);
```
