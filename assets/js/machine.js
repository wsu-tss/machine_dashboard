import { API_ENDPOINT } from './config.js';
import { sites } from './config.js';
import { apiData } from './utils.js';
import { generateMachineTable } from './utils.js';
import { getMachineLogs } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // console.log(sites);

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

        console.log(machineData);

        let machineLogs = getMachineLogs(machineData, sites, machineName);

        console.log(machineLogs);

        // sites.forEach((site, index) => {
        //     console.log(site);
        //     machineData.forEach((campusData, index) => {
        //         console.log(campusData["name"]);
        //         if (site == campusData["name"]){
        //             let machines = campusData["equipment"];
        //
        //             machines.forEach((machine, index) => {
        //                 if (machineName == machine["equipid"]){
        //                     let logs = machine["logs"];
        //                     console.log(logs);
        //                 }
        //             });
        //         }
        //     });
        // });

    }

});
