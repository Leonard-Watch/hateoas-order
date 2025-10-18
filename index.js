const express = require('express');
const app = express();
const { getOrderDetail } = require('./order.controller');

app.get('/api/orders/:id', getOrderDetail);

app.listen(3000, () => console.log('Servidor andando en http://localhost:3000'));