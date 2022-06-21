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

### Get API data

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
