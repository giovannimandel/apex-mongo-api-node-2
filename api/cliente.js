const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const ClienteSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  email: String,
  senha: String,
  endereco: String,
  pacotes_id: [Number]
}, { collection: 'clientes' });

const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

router.get('/api/cliente', async (req, res) => {
  await connectDB();
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api/cliente', async (req, res) => {
  await connectDB();
  const { nome, cpf, email, senha,endereco, pacotes_id } = req.body;
  const novoCliente = new Cliente({
    nome,
    cpf,
    email,
    senha,
    endereco,
    pacotes_id
  });

  try {
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
