const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const CidadeSchema = new mongoose.Schema({
  cidade: String,
  estado: String,
  populacao: Number
}, { collection: 'cidades' });

const Cidade = mongoose.models.Cidade || mongoose.model('Cidade', CidadeSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
};

app.get('/api/cidade', async (req, res) => {
  await connectDB();
  try {
    const cidades = await Cidade.find();
    res.status(200).json(cidades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/cidade', async (req, res) => {
  await connectDB();
  const { _id, nome, estado, populacao } = req.body;
  const novaCidade = new Cidade({
    cidade,
    estado,
    populacao
  });

  try {
    const cidadeSalva = await novaCidade.save();
    res.status(201).json(cidadeSalva);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
