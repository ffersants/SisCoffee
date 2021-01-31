const express = require('express');
const UserController = require('./src/controllers/UserController');
const CoffeeRegisterController = require('./src/controllers/CoffeeRegisterController');

const connection = require('./src/database/connection');
const app = express();
app.use(express.json())

app.get('/', async function (req, res) {
    const allUsers = await connection('users')
        .orderBy('position', 'asc');

    const three = {
        theNext: allUsers[allUsers.length - 1],
        theLast: allUsers[1],
        theOne: allUsers[0]
    }
    res.json(three);
})
//USER
app.post('/create/user', UserController.create)
app.get('/users', UserController.list)
app.delete('/remove/:userID', UserController.delete)

//COFFEE
app.post('/coffeeBought', CoffeeRegisterController.create)

app.listen(3300, function () {
    console.table('Servidor rodando')
})