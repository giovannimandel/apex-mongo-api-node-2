const mongoose = require('mongoose');

const FundadorSchema = new mongoose.Schema({
  _id: Number,
  nome: String,
  data_nascimento: Date,
  data_morte: Date,
  nacionalidade: String,
  atividade: String
}, { collection: 'fundadores' });

const Fundador = mongoose.models.Fundador || mongoose.model('Fundador', FundadorSchema);

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
      const fundadores = await Fundador.find();
      res.status(200).json(fundadores);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  if (req.method === 'POST') {
    const { _id, nome, data_nascimento, data_morte, nacionalidade, atividade } = req.body;
    const novoFundador = new Fundador({
      _id,
      nome,
      data_nascimento,
      data_morte,
      nacionalidade,
      atividade
    });

    try {
      const fundadorSalvo = await novoFundador.save();
      res.status(201).json(fundadorSalvo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
