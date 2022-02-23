import * as React from 'react';
import { useEffect } from 'react';
import {getOrders} from '../services/orders'

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    payOut: PropTypes.bool.isRequired ,
    address: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    recipentName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

function createData(id, description, payOut, address, recipentName, price) {
  // payOut == true ? 'pago': 'receber na entrega';
  address = [
    {
      date: '2020-01-05',
      customerId: '11091700',
      amount: 3,
    },
    {
      date: '2020-01-04',
      customerId: '11091700',
      amount: 3,
    }
  ];

  return {
    id,
    description,
    recipentName,
    payOut,
    price,
    address
  };
}

const rows = [
  createData(1, 'sanduiche natural ', false,[], 'João', 13.50),
  createData(2, 'sanduiche natural ', false,[], 'João', 13.50),
  createData(3, 'sanduiche natural ', false,[], 'João', 13.50),
  createData(4, 'sanduiche natural ', false,[], 'João', 13.50)
  
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.recipentName}</TableCell>
        <TableCell align="right">{row.payOut}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Endereço de entrega
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {row.address.map((addressRow) => (
                    <TableRow key={addressRow.date}>
                      <TableCell component="th" scope="row">
                        {addressRow.date}
                      </TableCell>
                      <TableCell>{addressRow.customerId}</TableCell>
                      <TableCell align="right">{addressRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(addressRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
              {/* botões de ação */}
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
                <Button variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Orders() {
 
  const [orders, getStateOrders] = React.useState('');
  // const [rows, setRows] = React.useState([])
 
  // const getAllOrders = () => {
  //   getOrders().then(res => { 
  //     if (res.status === 200) {
  //       const allOrders = JSON.stringify(res.data.data)
  //       getStateOrders(allOrders);
  //       let list_row = []
  //       res.data.data.map((order) => { 
  //         list_row.push({
  //           id: order.id, 
  //           description: order.attributes.description, 
  //           recipientName: order.attributes.recipient_name, 
  //           paidOut: order.attributes.paid_aout ? 'Pago' : 'Receber na entrega', 
  //           value: order.attributes.value
  //         })
  //       })
  //       setRows(list_row);
  //     } else {
  //       console.log('erro ao buscar pedidos');
  //       console.log(res.status);
  //     }

  //   }).catch (error => console.log('erro ao buscar pedidos'));
  // }

  // useEffect(() => {
  //     getAllOrders();
  // }, []);

  return (
    <div>
      <h1> Pedidos </h1>
      <ul>
        {/* { orders }    */}
      </ul>      
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Status pgto.</TableCell>
              <TableCell align="right">Cliente</TableCell>
              <TableCell align="right">Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  </div>


  );
}
