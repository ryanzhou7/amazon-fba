import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import './App.css';
import XLSX, { ParsingOptions, Sheet2JSONOpts } from 'xlsx';

import 'handsontable/dist/handsontable.full.css';
import { HotTable } from '@handsontable/react';
const settings = {
  licenseKey: 'non-commercial-and-evaluation',
};

const hotData = [
  ['', 'Tesla', 'Volvo', 'Toyota', 'Honda'],
  ['2020', 10, 11, 12, 13],
  ['2021', 20, 11, 14, 13],
  ['2022', 30, 15, 12, 13],
];

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const inputEl = useRef(null);

  return (
    <Box>
      <Box sx={{ width: 300, p: 3 }}>
        {/* <DropzoneArea
          // initialFiles = {[file]}
          onChange={(files) => handleFile(files[0], setData)}
          // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          filesLimit={1}
          maxFileSize={5000000}
        /> */}
      </Box>
      <HotTable
        data={hotData}
        colHeaders={true}
        rowHeaders={true}
        width="600"
        height="300"
        settings={settings}
      />
      {/* <Table data={data} /> */}
    </Box>
  );
};

export default App;

const handleFile = async (file: any, setData: any) => {
  const arrayBuffer = await file.arrayBuffer();

  const parsingOptions: ParsingOptions = {
    cellDates: true,
  };
  const workbook = XLSX.read(arrayBuffer, parsingOptions);

  const wsname = workbook.SheetNames[0];
  const ws = workbook.Sheets[wsname];
  /* Convert array of arrays */

  const options: Sheet2JSONOpts = {
    blankrows: false,
    header: 1,
    dateNF: 'YYYY-MM-DD',
  };
  const data = XLSX.utils.sheet_to_json(ws, options);
  setData(data);
  /* Update state */

  //setData(data);
  //setCols(make_cols(ws['!ref']));

  // Pass the option cellNF: true and the cell objects will have a z property which represents the cell format. Then test the format using XLSX.SSF.is_date(cell.z)
  //var wb = XLSX.utils.table_to_book(document.getElementById('table'), {dateNF:'dd/mm/yyyy;@',cellDates:true, raw: true});
  // 1	05/04/2021	Fifth April, Monday
};
