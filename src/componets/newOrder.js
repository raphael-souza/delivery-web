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
import { login } from '../services/authService'

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
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const user = {
      email: data.get('email'),
      password: data.get('password')
    }
    
    login(user).then(
      (response) => {
        if (response.status === 200) {
          localStorage.token = response.data.token;
          localStorage.user = JSON.stringify(response.data.user);
          history.push("/dashboard");
        }

      })
      .catch((error) => {
        setOpen(true);

        console.log(error)
      });

  };

  // alerta de erro
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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

            <Typography component="h3" variant="h5">
            Endereço
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Descrição"
              name="addressDescription"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="cep"
              label="CEP"
              name="addressCEP"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="number"
              label="Número"
              name="addressNumber"
            />
            <TextField
              margin="normal"
              fullWidth
              id="reference"
              label="Referência"
              name="addressReference"
            />
            <TextField
              margin="normal"
              fullWidth
              id="street"
              label="Rua"
              name="addressStreet"
            />

            <TextField
              margin="normal"
              fullWidth
              id="city"
              label="Cidade"
              name="addressCity"
            />

            <TextField
              margin="normal"
              fullWidth
              id="cistrict"
              label="Bairro"
              name="addressDistrict"
            />

            _______________________________________
            <TextField
              margin="normal"
              fullWidth
              id="recipientName"
              label="Nome do cliente"
              name="Recipentname"
            />

            <TextField
              margin="normal"
              fullWidth
              id="price"
              label="Valor do pedido"
              name="Price"
            />

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
                Senha Ou email incorreto!
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