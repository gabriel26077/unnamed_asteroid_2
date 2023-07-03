const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Rota para servir as imagens
app.use('/images', express.static('images'));
app.use('/sons', express.static('sons'));

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.\nAcesse via: localhost:3000/images/exemplo.jpg\nAperte ctrl+c para desligar');
});