import Papa from "papaparse";

import { useDataStore } from "../store/useDataStore";
import addDebugMessage from "./debugMessage";
import CONSTANTS from "./constants";

export default function loadCSVData() {
    addDebugMessage('Loading CSV data...');

    const { setOrgData } = useDataStore.getState();

    Papa.parse(CONSTANTS.sheetURL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            addDebugMessage(`CSV loaded. Rows: ${results.data.length}`, 'success');
            setOrgData(results)
        },
        error: function(error) {
            addDebugMessage(`CSV error: ${error}`, 'error');
        }
    });
}