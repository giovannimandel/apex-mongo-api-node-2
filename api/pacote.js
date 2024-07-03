const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PacoteSchema = new mongoose.Schema({
  preco: Number,
  data_inicio: Date,
  data_fim: Date,
  ponto_turistico_id: Number,
  dia: Date,
  hora_inicio: String,
  hora_final: String,
  cidade_id: Number,
  hotel_id: Number
}, { collection: 'pacotes' });

const Pacote = mongoose.models.Pacote || mongoose.model('Pacote', PacoteSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI);
};

app.get('/api/pacote', async (req, res) => {
  await connectDB();
  try {
    const pacotes = await Pacote.find();
    res.status(200).json(pacotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/pacote', async (req, res) => {
  await connectDB();
  const { preco, data_inicio, data_fim, ponto_turistico_id, dia, hora_inicio, hora_final, cidade_id, hotel_id } = req.body;
  const novoPacote = new Pacote({
    preco,
    data_inicio,
    data_fim,
    ponto_turistico_id,
    dia,
    hora_inicio,
    hora_final,
    cidade_id,
    hotel_id
  });

  try {
    const pacoteSalvo = await novoPacote.save();
    res.status(201).json(pacoteSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
