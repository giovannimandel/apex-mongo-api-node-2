const mongoose = require('mongoose');

const CidadeSchema = new mongoose.Schema({
  _id: Number,
  nome: String,
  estado: String,
  populacao: Number
}, { collection: 'cidades' });

const Cidade = mongoose.models.Cidade || mongoose.model('Cidade', CidadeSchema);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const cidades = await Cidade.find();
      res.status(200).json(cidades);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  if (req.method === 'POST') {
    const { _id, nome, estado, populacao } = req.body;

    const novaCidade = new Cidade({
      _id,
      nome,
      estado,
      populacao
    });

    try {
      const cidadeSalva = await novaCidade.save();
      res.status(201).json(cidadeSalva);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};