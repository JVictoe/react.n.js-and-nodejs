const express = require('express');
const server = express();
server.use(express.json());

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);

server.get('/teste', (req, res) => {
    res.send("Tudo certo");
});

server.listen(3000, () => {
    console.log('API ONLINE');
});