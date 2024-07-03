const express = require('express');
const app = express();

app.use(express.json());

const cidadeRoutes = require('./api/cidade');
const clienteRoutes = require('./api/cliente');
const pacoteRoutes = require('./api/pacote');
const restauranteRoutes = require('./api/restaurante');

app.use('/api', cidadeRoutes);
app.use('/api', clienteRoutes);
app.use('/api', pacoteRoutes);
app.use('/api', restauranteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
