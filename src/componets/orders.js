import * as React from 'react';
import { useEffect } from 'react';
import {getOrders} from '../services/orders'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
  { 
    id: 'id', 
    label: 'Número do pedido - ID',
    align: 'right',
    minWidth: 70 
  },
  {
    id: 'description',
    label: 'Descrição',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'recipientName',
    label: 'Cliente',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'paidOut',
    label: 'Situação pagamento',
    minWidth: 70,
    align: 'right'
  },
  {
    id: 'value',
    label: 'Valor',
    minWidth: 170,
    align: 'right'
  },
];

export default function Orders() {
 
  const [orders, getStateOrders] = React.useState('');
  const [rows, setRows] = React.useState([])
 
  const getAllOrders = () => {
    getOrders().then(res => { 
      if (res.status === 200) {
        const allOrders = JSON.stringify(res.data.data)
        getStateOrders(allOrders);
        let list_row = []
        res.data.data.map((order) => { 
          list_row.push({
            id: order.id, 
            description: order.attributes.description, 
            recipientName: order.attributes.recipient_name, 
            paidOut: order.attributes.paid_aout ? 'Pago' : 'Receber na entrega', 
            value: order.attributes.value
          })
        })
        setRows(list_row);
      } else {
        console.log('erro ao buscar pedidos');
        console.log(res.status);
      }

    }).catch (error => console.log('erro ao buscar pedidos'));
  }

  useEffect(() => {
      getAllOrders();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h1> Pedidos </h1>
      <ul>
        { orders }   
      </ul>      
    
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

  </div>


  );
}
