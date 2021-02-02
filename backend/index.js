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
        theNext: allUsers[1],
        theOne: allUsers[0],
        theLast: allUsers[allUsers.length - 1]
    }
    res.json(three);
})
//USER
app.post('/create/user', UserController.create)
app.get('/users', UserController.list)
app.delete('/remove/:userID', UserController.delete)

//COFFEE
app.post('/coffeeBought', async function (req, res) {
    const { name, date } = req.body;

    try {
        if (!name || !date) throw new Error('Informações como usuário e/ou data não preenchida(s) para cadastro de compra.')

        nameExists = await connection('users')
            .where('name', name)
            .first();

        if (!nameExists) throw new Error('Usuário(a) não encontrado.')

        backDate = new Date().toLocaleDateString("pt-br", {
            dateStyle: 'short'
        })

        if (date !== String(backDate)) {
            throw new Error(`A data da requisição e do backend diferem!`)
        }

        await CoffeeRegisterController.create(name, date)
        await UserController.update.position(name)
        await UserController.update.lastCoffeeAcquisition(name, date)
        return res.status(200).send("Compra registrada e tabela atualizada!")

    } catch (err) {
        return res.status(500).json({
            //nothing changed
            message: 'Ops! Um erro aqui na hora de registrar a compra e ordenar a tabela.' + err
        })
    }
})

app.listen(3300, function () {
    console.table('Servidor rodando')
})