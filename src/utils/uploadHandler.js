import * as XLSX from 'xlsx';

let handleFileUpload = (e, stateHandler, isContestant)=> {
    e.preventDefault();
  
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        let data = e.target.result;
        let readData = XLSX.read(data, { type: 'binary' });
        const wsname = readData.SheetNames[0];
        const ws = readData.Sheets[wsname];

        /*Convert array to JSON*/
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        stateHandler(dataParse, isContestant);

       
    }
    reader.readAsBinaryString(file);
}

export default handleFileUpload;