const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const RestauranteSchema = new mongoose.Schema({
  nome: String,
  endereco: {
    rua: String,
    bairro: String,
    cep: String
  },
  categoria: Number,
  preco_medio: Number,
  cidade_id: Number,
  especialidade: String
}, { collection: 'restaurantes' });

const Restaurante = mongoose.models.Restaurante || mongoose.model('Restaurante', RestauranteSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

router.get('/api/restaurante', async (req, res) => {
  await connectDB();
  try {
    const restaurantes = await Restaurante.find();
    res.status(200).json(restaurantes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api/restaurante', async (req, res) => {
  await connectDB();
  const { nome, endereco, categoria, preco_medio, cidade_id, especialidade } = req.body;
  const novoRestaurante = new Restaurante({
    nome,
    endereco,
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

module.exports = router;
