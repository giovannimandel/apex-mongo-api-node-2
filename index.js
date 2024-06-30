const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/agencia_turismo', {
}).then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

app.use(express.json());


const Schema = mongoose.Schema;

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


// Fundador -------------------------
const FundadorSchema = new Schema({
    _id: Number,
    nome: String,
    data_nascimento: Date,
    data_morte: Date,
    nacionalidade: String,
    atividade: String
}, { collection: 'fundadores' });
const Fundador = mongoose.model('fundador', FundadorSchema);

// Criar endpoints RESTful
app.get('/api/fundador', async (req, res) => {
    try {
        const fundador = await Fundador.find();
        res.json(fundador);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/api/fundador', async (req, res) => {
    const fundador = new Fundador({
        _id: req.body._id,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento,
        data_morte: req.body.data_morte,
        nacionalidade: req.body.nacionalidade,
        atividade: req.body.atividade
    });

    try {
        const newFundador = await fundador.save();
        res.status(201).json(newFundador);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//-------------------------------


// Cliente -------------------------
const ClienteSchema = new Schema({
    _id: Number,
    nome: String,
    cpf: String,
    email: String,
    senha: String,
    endereco: {
        rua: String,
        bairro: String,
        cep: String
    },
    pacotes_id: [Number]
});
const Cliente = mongoose.model('cliente', ClienteSchema);

// Criar endpoints RESTful
app.get('/api/cliente', async (req, res) => {
    try {
        const cliente = await Cliente.find();
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/cliente', async (req, res) => {
    const cliente = new Cliente({
        _id: req.body._id,
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha,
        endereco: {
            rua: req.body.endereco.rua,
            bairro: req.body.endereco.bairro,
            cep: req.body.endereco.cep
        },
        pacotes_id: req.body.pacotes_id
    });

    try {
        const newCliente = await cliente.save();
        res.status(201).json(newCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//-------------------------------



// Pacote -------------------------
const PacoteSchema = new Schema({
    _id: Number,
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
});
const Pacote = mongoose.model('pacote', PacoteSchema);

// Criar endpoints RESTful
app.get('/api/pacote', async (req, res) => {
    try {
        const pacote = await Pacote.find();
        res.json(pacote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/pacote', async (req, res) => {
    const pacote = new Pacote({
        _id: req.body._id,
        preco: req.body.preco,
        data_inicio: new Date(req.body.data_inicio),
        data_fim: new Date(req.body.data_fim),
        pontos_turisticos: req.body.pontos_turisticos.map(ponto => ({
            ponto_turistico_id: ponto.ponto_turistico_id,
            dia: new Date(ponto.dia),
            hora_inicio: ponto.hora_inicio,
            hora_final: ponto.hora_final
        })),
        cidade_id: req.body.cidade_id,
        hotel_id: req.body.hotel_id
    });

    try {
        const newPacote = await pacote.save();
        res.status(201).json(newPacote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//-------------------------------



// Restaurante -------------------------
const RestauranteSchema = new Schema({
    _id: Number,
    nome: String,
    endereco: {
        rua: String,
        bairro: String,
        cep: String
    },
    categoria: Number,
    preco_medio: Number,
    cidade_id: Number,
    especialidade_id: Number
});
const Restaurante = mongoose.model('restaurante', RestauranteSchema);

// Criar endpoints RESTful
app.get('/api/restaurante', async (req, res) => {
    try {
        const restaurante = await Restaurante.find();
        res.json(restaurante);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/restaurante', async (req, res) => {
    const restaurante = new Restaurante({
        _id: req.body._id,
        nome: req.body.nome,
        endereco: {
            rua: req.body.endereco.rua,
            bairro: req.body.endereco.bairro,
            cep: req.body.endereco.cep
        },
        categoria: req.body.categoria,
        preco_medio: req.body.preco_medio,
        cidade_id: req.body.cidade_id,
        especialidade_id: req.body.especialidade_id
    });

    try {
        const newRestaurante = await restaurante.save();
        res.status(201).json(newRestaurante);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//-------------------------------


// Hotel -------------------------
const HotelSchema = new Schema({
    _id: Number,
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
});
const Hotel = mongoose.model('hotel', HotelSchema);

// Criar endpoints RESTful
app.get('/api/hotel', async (req, res) => {
    try {
        const hotel = await Hotel.find();
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/hotel', async (req, res) => {
    const hotel = new Hotel({
        _id: req.body._id,
        nome: req.body.nome,
        endereco: {
            rua: req.body.endereco.rua,
            bairro: req.body.endereco.bairro,
            cep: req.body.endereco.cep
        },
        numQuartos: req.body.numQuartos,
        categoria: req.body.categoria,
        tipo_quartos: req.body.tipo_quartos.map(quarto => ({
            tipo: quarto.tipo,
            preco: quarto.preco
        })),
        cidade_id: req.body.cidade_id,
        restaurante_id: req.body.restaurante_id
    });

    try {
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//-------------------------------


// Ponto Turistico -------------------------
const ParqueSchema = new Schema({
    dataDeFundacao: Date,
    area: Number
});

const IgrejaSchema = new Schema({
    dataDeFundacao: Date,
    estiloDeConstrucao: String
});

const CasaDeShowSchema = new Schema({
    horarioDeInicio: Number,
    diaDeFechamento: String,
    restaurante_id: Number
});

const MuseuSchema = new Schema({
    data_fundacao: Date,
    numero_de_salas: Number,
    fundadores_id: [Number]
});

const PontoTuristicoSchema = new Schema({
    _id: Number,
    nome: String,
    descricao: String,
    endereco: {
        rua: String,
        bairro: String,
        cep: String
    },
    parque: ParqueSchema,
    igreja: IgrejaSchema,
    casaDeShow: CasaDeShowSchema,
    museu: MuseuSchema,
    cidade_id: Number
}, {collection: "pontos_turisticos"});
const PontoTuristico = mongoose.model('ponto_turistico', PontoTuristicoSchema);

// Criar endpoints RESTful
app.get('/api/ponto_turistico', async (req, res) => {
    try {
        const pontoTuristico = await PontoTuristico.find();
        res.json(pontoTuristico);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/ponto_turistico', async (req, res) => {
    const pontoTuristico = new PontoTuristico({
        _id: req.body._id,
        nome: req.body.nome,
        descricao: req.body.descricao,
        endereco: {
            rua: req.body.endereco.rua,
            bairro: req.body.endereco.bairro,
            cep: req.body.endereco.cep
        },
        parque: req.body.parque ? {
            dataDeFundacao: new Date(req.body.parque.dataDeFundacao),
            area: req.body.parque.area
        } : undefined,
        igreja: req.body.igreja ? {
            dataDeFundacao: new Date(req.body.igreja.dataDeFundacao),
            estiloDeConstrucao: req.body.igreja.estiloDeConstrucao
        } : undefined,
        casaDeShow: req.body.casaDeShow ? {
            horarioDeInicio: req.body.casaDeShow.horarioDeInicio,
            diaDeFechamento: req.body.casaDeShow.diaDeFechamento,
            restaurante_id: req.body.casaDeShow.restaurante_id
        } : undefined,
        museu: req.body.museu ? {
            data_fundacao: new Date(req.body.museu.data_fundacao),
            numero_de_salas: req.body.museu.numero_de_salas,
            fundadores_id: req.body.museu.fundadores_id
        } : undefined,
        cidade_id: req.body.cidade_id
    });

    try {
        const newPontoTuristico = await pontoTuristico.save();
        res.status(201).json(newPontoTuristico);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//-------------------------------



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
