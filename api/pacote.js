const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const PacoteSchema = new mongoose.Schema({
  preco: Number,
  data_inicio: Date,
  data_fim: Date,
  pontos_turisticos: [
    {
      ponto_turistico_id: Number,
      dia: Date,
      hora_inicio: String,
      hora_final: String
    }
  ],
  cidade_id: Number,
  hotel_id: Number
}, { collection: 'pacotes' });

const Pacote = mongoose.models.Pacote || mongoose.model('Pacote', PacoteSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

router.get('/api/pacote', async (req, res) => {
  await connectDB();
  try {
    const pacotes = await Pacote.find();
    res.status(200).json(pacotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api/pacote', async (req, res) => {
  await connectDB();
  const { preco, data_inicio, data_fim, pontos_turisticos, cidade_id, hotel_id } = req.body;
  const novoPacote = new Pacote({
    preco,
    data_inicio,
    data_fim,
    pontos_turisticos,
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

module.exports = router;
