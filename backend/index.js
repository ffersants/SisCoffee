const express = require('express');
const UserController = require('./src/controllers/UserController')
const app = express();
app.use(express.json())

app.post('/create/user', UserController.create)

app.get('/users', UserController.list)

app.delete('/remove/:userID', UserController.delete)

app.listen(3300, function () {
    console.table('Servidor rodando')
})