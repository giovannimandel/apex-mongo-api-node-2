const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const HotelSchema = new mongoose.Schema({
  nome: String,
  endereco: {
    rua: String,
    bairro: String,
    cep: String
  },
  numQuartos: Number,
  categoria: Number,
  tipo_quartos: [
    {
      tipo: String,
      preco: Number
    }
  ],
  cidade_id: Number,
  restaurante_id: Number
}, { collection: 'hoteis' });

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

router.get('/api/hotel', async (req, res) => {
  await connectDB();
  try {
    const hoteis = await Hotel.find();
    res.status(200).json(hoteis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api/hotel', async (req, res) => {
  await connectDB();
  const { nome, endereco, numQuartos, categoria, tipo_quartos, cidade_id, restaurante_id } = req.body;
  const novoHotel = new Hotel({
    nome,
    endereco,
    numQuartos,
    categoria,
    tipo_quartos,
    cidade_id,
    restaurante_id
  });

  try {
    const hotelSalvo = await novoHotel.save();
    res.status(201).json(hotelSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
