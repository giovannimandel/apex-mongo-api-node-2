//Cidade -------------------------
const CidadeSchema = new Schema({
    _id: Number,
    nome: String,
    estado: String,
    populacao: Number
});
const Cidade = mongoose.model('cidade', CidadeSchema);

// Criar endpoints RESTful
app.get('/api/cidade', async (req, res) => {
    try {
        const cidade = await Cidade.find();
        res.json(cidade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/api/cidade', async (req, res) => {
    const cidade = new Cidade({
        _id: req.body._id,
        nome: req.body.nome,
        estado: req.body.estado,
        populacao: req.body.populacao
    });

    try {
        const newCidade = await cidade.save();
        res.status(201).json(newCidade);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//-------------------------------