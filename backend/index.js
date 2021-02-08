const express = require('express');
const cors = require('cors');
const UserController = require('./src/controllers/UserController');
const CoffeeRegisterController = require('./src/controllers/CoffeeRegisterController');

const connection = require('./src/database/connection');
const app = express();

app.use((req, res, next) => {
    /*
    https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue#comment28704031_18311469
    */
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8002');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next()
})

app.use(express.json())

async function verificaCredenciais(user, psw){
 return await connection('adm_tb')
                .where({userName: user, password: psw})
                .first()
}

app.get('/', async function (req, res) {
    const allUsers = await connection('users')
        .orderBy('position', 'asc');
    let showThem = {};
   
    if (allUsers.length === 2) {
        showThem = {
            theNext: allUsers[1],
            theOne: allUsers[0],
        }
    } else if (allUsers.length === 1) {
        showThem = {
            theOne: allUsers[0]
        }
    } else {
        showThem = {
            theNext: allUsers[1],
            theOne: allUsers[0],
            theLast: allUsers[allUsers.length - 1]
        }
    }

    res.json(showThem);
});

//USER
app.post('/create/user', async(req, res) => {
    const {name, section, signUpDate, surplus, admUser, admPassword} = req.body

    const autenticado = await verificaCredenciais(admUser, admPassword);
  
    if(!autenticado){
        console.log("Usuário e/ou senha da conta administradoras são inválidas.")
        return res.status(401).json({
            status: 401,
            message: "Credenciais inválidas!"
        });
    }

    const created = await UserController.create(req, res)
        if(created.statusCode !== 201) return
    await CoffeeRegisterController.create(name, signUpDate)

    if(surplus > 0) {
        //alimentar tabela aqui
        for (i = 0; i != surplus; i++) {
             await connection('surplus_tb')
                .insert({
                    userName: name,
                    surplusRegisterDate: signUpDate,
                })
        }
    }
    return res.status(201).json({
        status: 201,
        message: 'Usuário cadastrado com sucesso!'
    }).send()
})
app.get('/users', UserController.list)
app.delete('/remove/:userID', async(req, res) => {
    
    const {admUser, admPassword} = req.body

    const autenticado = await verificaCredenciais(admUser, admPassword)
    console.log("Usuário e/ou senha da conta administradoras são inválidas.")
        if(!autenticado){
            return res.status(401).json({
                status: 401,
                message: "Credenciais inválidas!"
            });
        }
    UserController.delete

})

//COFFEE
app.post('/coffeeBought', async function (req, res) {
    const { name, date, surplus, useSurplus, admUser, admPassword } = req.body;
    
    const autenticado = await verificaCredenciais(admUser, admPassword)
    console.log("Usuário e/ou senha da conta administradoras são inválidas.")
        if(!autenticado){
            return res.status(401).json({
                status: 401,
                message: "Credenciais inválidas!"
            });
        }
  
    try {
        if (!name || !date || surplus === undefined || surplus === "" || surplus === NaN || !useSurplus) throw new Error('Informações como usuário, saldo e/ou data não preenchida(s) para cadastro de compra.')

        nameExists = await connection('users')
            .where('name', name)
            .first();

        if (!nameExists) throw new Error('Usuário(a) não encontrado.')

        backDate = new Date().toLocaleDateString("pt-br", {
            dateStyle: 'short'
        })

        // if (date !== String(backDate)) {
        //     throw new Error(`A data da requisição e do backend diferem!`)
        // }


        //verifica se há saldo disponível ainda não utilizado pelo usuário
        hasSurplus = Object.values(await connection('surplus_tb')
            .where('userName', name)
            .where('used', 'false'));

        if (hasSurplus.length === 0 && useSurplus === 'true') {
            return res.status(401).json({
                status:401,
                message:'Não há saldo disponível para uso!'
            })
        }
        else if (hasSurplus.length > 0 && useSurplus === 'true') {
            //resgata o ID de um saldo válido para passá-lo no registro que será feito na tabela coffee_register
            console.log(hasSurplus[0].surplusID)
            const surplusID = Object.values(
                await connection('surplus_tb')
                    .where('surplusID', hasSurplus[0].surplusID)
                    .first()
            )[0]
            //recebe o ID do registro realizado na tabela coffee_register usando saldo
            coffeeRegisterID = await CoffeeRegisterController.create(name, date, surplusID);
            //atualiza a surplus_tb para remover saldo e indicar o ID do registro em que o saldo foi utilizado
            await connection('surplus_tb')
                .where('surplusID', surplusID)
                .update({
                    used: 'true',
                    usedInCoffeeRegister: coffeeRegisterID
                })
        } else {
            await CoffeeRegisterController.create(name, date)
        }
        if (surplus > 0) {
            for (i = 0; i !== surplus; i++) {
                try {
                    await connection('surplus_tb')
                        .insert({
                            userName: name,
                            surplusRegisterDate: date,
                        })
                } catch (err) {
                    throw new Error('Não foi possível inserir o saldo.' + err.message)
                }
            }
        }
        await UserController.update.saldo(name)
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
    console.table('Servidor rodando na porta 3300')
})