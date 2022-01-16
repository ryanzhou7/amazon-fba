import { Box } from '@mui/material';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import XLSX from 'xlsx';

import { headers } from '../data';

const getCompose = (rowData: any) => {
  return rowData.map((r: any) => {
    const obj: any = {};
    obj[headers[0]] = r[0];
    obj[headers[1]] = r[1];
    obj[headers[2]] = r[2];
    obj[headers[3]] = r[2];
    return obj;
  });
};

export const Table = ({ data, ...rest }: any) => {
  const rows = getCompose(data);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
          <AgGridReact rowData={rows}>
            {headers.map((h: string) => {
              return <AgGridColumn key={h} field={h}></AgGridColumn>;
            })}
          </AgGridReact>
        </div>
      </Box>
    </>
  );
};

/* generate an array of column objects */
const make_cols = (refstr: any) => {
  const o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };

  return o;
};

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
function OutTable({ data, cols }: any) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {cols.map((c: { key: string; name: string }) => (
              <th key={c.key}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r: any, i: number) => (
            <tr key={i}>
              {cols.map((c: { key: string }) => (
                <td key={c.key}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
