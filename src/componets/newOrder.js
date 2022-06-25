import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import {Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createOrder } from '../services/orders'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useHistory } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewOrder() {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = new FormData(event.currentTarget);    
    
    createOrder(newOrder).then(
      (response) => {
        console.log('pedido cadastrado!')
        setOpenSucess(true);

      })
      .catch((error) => {
        setOpen(true);
        console.log(error)
      });

  };

  // alerta de erro
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSucess] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSucess(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
          Adicionar Novo Pedido
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Descrição"
              name="description"
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              id="recipientName"
              label="Nome do cliente"
              name="recipientName"
            />

            <TextField
              margin="normal"
              fullWidth
              id="price"
              label="Valor do pedido"
              name="price"
            />

            <Typography component="h3" variant="h5">
            Endereço
            </Typography>

{/* utilizar api do google para gerar endereço https://www.devmedia.com.br/como-utilizar-a-google-geocoding-api-para-obter-enderecos/36751 */}
            <TextField
              margin="normal"
              fullWidth
              id="formatedAddress"
              label="Endereço"
              name="formatedAddress"
            />

            <TextField
              margin="normal"
              fullWidth
              id="lat"
              label="Latitude"
              name="lat"
            />

            <TextField
              margin="normal"
              fullWidth
              id="long"
              label="Longitude"
              name="long"
            />
            
            <Typography component="h3" variant="h5">
            Forma de pagamento
            </Typography>

            <FormControlLabel
              control={<Checkbox value="true" color="primary" />}
              label="Pagar na entrega"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Erro ao cadastrar pedido!
              </Alert>
            </Snackbar>

            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
              <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                pedido cadastrado com sucesso!
              </Alert>
            </Snackbar>

            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}