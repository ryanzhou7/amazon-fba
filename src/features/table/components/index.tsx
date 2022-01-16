import { Box, Button } from '@mui/material';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/shared/interfaces';
import XLSX from 'xlsx';

import './app.scss';
import { headers } from '../data';

const getCompose = (rowData: any) => {
  return rowData.map((r: any) => {
    const obj: any = {};
    obj[headers[0]] = r[0];
    obj[headers[1]] = r[1];
    obj[headers[2]] = r[2];
    obj[headers[3]] = r[2];
    // obj[headers[4]] = r[4];
    // obj[headers[5]] = r[5];
    // obj[headers[6]] = r[6];
    return obj;
  });
};

export const Table = ({ data, ...rest }: any) => {
  const rows = getCompose(data);

  const gridProps: AgGridReactProps = {};

  const defaultColDef = {
    resizable: true,
    editable: true,
    filter: true,
    sortable: true,
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
            /* generate XLSX file and send to client */
            XLSX.writeFile(wb, 'sheetjs.xlsx');
          }}
        >
          Download
        </Button>
        <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
          <AgGridReact defaultColDef={defaultColDef} rowData={rows} {...gridProps}>
            {headers.map((h: string) => {
              return <AgGridColumn key={h} field={h}></AgGridColumn>;
            })}
          </AgGridReact>
        </div>
      </Box>
    </>
  );
};
