const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const ParqueSchema = new mongoose.Schema({
  dataDeFundacao: Date,
  area: Number
});

const IgrejaSchema = new mongoose.Schema({
  dataDeFundacao: Date,
  estiloDeConstrucao: String
});

const CasaDeShowSchema = new mongoose.Schema({
  horarioDeInicio: Number,
  diaDeFechamento: String,
  restaurante_id: Number
});

const MuseuSchema = new mongoose.Schema({
  data_fundacao: Date,
  numero_de_salas: Number,
  fundadores_id: [Number]
});

const PontoTuristicoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  endereco: {
    rua: String,
    bairro: String,
    cep: String
  },
  tipo: {
    type: String,
    enum: ['parque', 'igreja', 'casaDeShow', 'museu'],
    required: true
  },
  parque: ParqueSchema,
  igreja: IgrejaSchema,
  casaDeShow: CasaDeShowSchema,
  museu: MuseuSchema,
  cidade_id: Number
}, { collection: 'pontos_turisticos' });

const PontoTuristico = mongoose.models.PontoTuristico || mongoose.model('PontoTuristico', PontoTuristicoSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

router.get('/api/ponto_turistico', async (req, res) => {
  await connectDB();
  try {
    const pontosTuristicos = await PontoTuristico.find();
    res.status(200).json(pontosTuristicos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api/ponto_turistico', async (req, res) => {
  await connectDB();
  const { nome, descricao, endereco, tipo, parque, igreja, casaDeShow, museu, cidade_id } = req.body;
  const novoPontoTuristico = new PontoTuristico({
    nome,
    descricao,
    endereco,
    tipo,
    parque: tipo === 'parque' ? parque : undefined,
    igreja: tipo === 'igreja' ? igreja : undefined,
    casaDeShow: tipo === 'casaDeShow' ? casaDeShow : undefined,
    museu: tipo === 'museu' ? museu : undefined,
    cidade_id
  });

  try {
    const pontoTuristicoSalvo = await novoPontoTuristico.save();
    res.status(201).json(pontoTuristicoSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
