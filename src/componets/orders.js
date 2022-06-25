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


// add pedido
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// ***** 
Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    payOut: PropTypes.string,
    recipentName: PropTypes.string,
    price: PropTypes.number,
    createdAt: PropTypes.string
  }).isRequired,
};

function createData(data) {
  const order = data.attributes 
  debugger 
  return {
    id: order.id,
    description: order.description || '-',
    recipentName: order.recipient_name || '-',
    payOut: !!order.paid_out ? 'Pago' : 'Receber na entrega',
    price:  order.value || 0,
    createdAt: order.created_at
  };
}

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
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Rua</TableCell>
                    <TableCell align="right">Numero</TableCell>
                    <TableCell align="right">Bairro</TableCell>
                    <TableCell align="right">cidade</TableCell>
                    <TableCell align="right">cep</TableCell>
                  </TableRow>
                </TableHead>
                
                {/* <TableBody>
                  {row.address.map((addressRow) => (
                    <TableRow key={addressRow.createdAt}>
                      <TableCell component="th" align="right" scope="row">
                        {addressRow.description}
                      </TableCell>
                      <TableCell component="th" align="right" scope="row">
                        {addressRow.street}
                      </TableCell>
                      <TableCell component="th" align="right" scope="row">
                        {addressRow.number}
                      </TableCell>
                      <TableCell component="th" align="right" scope="row">
                        {addressRow.district}
                      </TableCell>
                      <TableCell component="th" align="right" scope="row">
                        {addressRow.city}
                      </TableCell>
                      <TableCell component="th" align="right" scope="row">
                        {addressRow.cep}
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody> */}

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
 
  const [orders, setStateOrders] = React.useState([]);
 
  const fetchOrders = () => {
    getOrders().then(res => { 
      if (res.status === 200) {
        let list_orders = []

        res.data.data.map((order) => { 
          list_orders.push(createData(order))
        })
        setStateOrders(list_orders);
      } else {
        console.log('erro ao buscar pedidos');
        console.log(res.status);
      }

    }).catch (error => console.log('erro ao buscar pedidos'));
  }

  useEffect(() => {
      fetchOrders();
  }, []);

  return (
    <div>
      <h1> Pedidos </h1>
     
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
            {orders.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
  </div>


  );
}
