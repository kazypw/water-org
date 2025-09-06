import Papa from "papaparse";

import { useDataStore } from "../store/useDataStore";
import CONSTANTS from "./constants";

export default function loadCSVData() {
    console.log('Loading CSV data...');

    const { setOrgData } = useDataStore.getState();

    Papa.parse(CONSTANTS.sheetURL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            console.log(`CSV loaded. Rows: ${results.data.length}`, 'success');
            setOrgData(results)
        },
        error: function(error) {
            console.log(`CSV error: ${error}`, 'error');
        }
    });
}