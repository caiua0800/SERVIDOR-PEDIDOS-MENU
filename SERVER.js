const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let listaPedidos = []; 
let listaProntos = []; 

app.post('/addPedidos', (req, res) => {
    const data = req.body;
    console.log('Dados recebidos:', data);

    listaPedidos.push(data);

    res.send('POST recebido com sucesso!');
});

app.get('/getPedidos', (req, res) => {
    res.json(listaPedidos);
});

app.get('/getProntos', (req, res) => {
    res.json(listaProntos);
});

app.post('/pedidoPronto', (req, res) => {
    const data = req.body;
    console.log('Pedido pronto:', data);

    const index = listaPedidos.findIndex(pedido => pedido.nome === data.nome && pedido.mesa === data.mesa);
    
    if (index !== -1) {
        listaPedidos.splice(index, 1);
        listaProntos.push(data);

        res.send('Pedido marcado como pronto com sucesso!');
    } else {
        res.status(404).send('Pedido não encontrado na lista de pedidos.');
    }
});

app.get('/', (req, res) => {
    res.send('Hello My Friend');
});

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
