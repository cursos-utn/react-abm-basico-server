const express = require('express');
const app = express();
const uniqid = require('uniqid');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

let listado = [];

app.get('/api/personas', (req, res) => {
    res.json(listado);
});

app.get('/api/personas/:id', (req, res) => {
    const itemFound = listado.find(item => item.id == req.params.id);
    if (itemFound) res.json(itemFound);
    else res.status(404).send();
});

app.post('/api/personas', (req, res) => {
    const newItem = {
        ...req.body,
        id: uniqid(),
    };
    listado = [...listado, newItem];
    res.json(newItem);
});

app.put('/api/personas/:id', (req, res) => {
    const toUpdate = {...req.body, id: req.params.id};
    listado = listado.map(item => (item.id == req.params.id ? toUpdate : item));
    res.json(toUpdate);
});

app.delete('/api/personas/:id', (req, res) => {
    listado = listado.filter(item => item.id != req.params.id);
    res.json({});
});


let listadoTelefonos = [];

app.get('/api/telefonos', (req, res) => {
    res.json(listadoTelefonos);
});

app.get('/api/telefonos/:id', (req, res) => {
    const itemFound = listadoTelefonos.find(item => item.id == req.params.id);
    if (itemFound) res.json(itemFound);
    else res.status(404).send();
});

app.post('/api/telefonos', (req, res) => {
    const newItem = {
        ...req.body,
        id: uniqid(),
    };
    listadoTelefonos = [...listadoTelefonos, newItem];
    res.json(newItem);
});

app.put('/api/telefonos/:id', (req, res) => {
    const toUpdate = {...req.body, id: req.params.id};
    listadoTelefonos = listadoTelefonos.map(item => (item.id == req.params.id ? toUpdate : item));
    res.json(toUpdate);
});

app.delete('/api/telefonos/:id', (req, res) => {
    listadoTelefonos = listadoTelefonos.filter(item => item.id != req.params.id);
    res.json({});
});

app.listen(PORT, () => console.log(`App corriendo en el puerto ${PORT}`));
