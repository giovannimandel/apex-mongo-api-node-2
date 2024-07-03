const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const RestauranteSchema = new mongoose.Schema({
  nome: String,
  rua: String,
  bairro: String,
  cep: String,
  categoria: Number,
  preco_medio: Number,
  cidade_id: Number,
  especialidade: String
}, { collection: 'restaurantes' });

const Restaurante = mongoose.models.Restaurante || mongoose.model('Restaurante', RestauranteSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
};

app.get('/api/restaurante', async (req, res) => {
  await connectDB();
  try {
    const restaurantes = await Restaurante.find();
    res.status(200).json(restaurantes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/restaurante', async (req, res) => {
  await connectDB();
  const { nome, rua, bairro, cep, categoria, preco_medio, cidade_id, especialidade } = req.body;
  const novoRestaurante = new Restaurante({
    nome,
    rua,
    bairro,
    cep,
    categoria,
    preco_medio,
    cidade_id,
    especialidade
  });

  try {
    const restauranteSalvo = await novoRestaurante.save();
    res.status(201).json(restauranteSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
