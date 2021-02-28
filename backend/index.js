const express = require('express');
const cors = require('cors');
const UserController = require('./src/controllers/UserController');
const CoffeeRegisterController = require('./src/controllers/CoffeeRegisterController');

const connection = require('./src/database/connection');
const app = express();

app.use((req, res, next) => {
    // clientIP = req.connection.remoteAddress)

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

async function ckeckCredentials(user, pswd){
 return await connection('adm_tb')
                .where({userName: user, password: pswd})
                .first()
}

function checkReqBody(reqBody){
    let whatsMissing = Object.entries(reqBody).filter( data => {
        if(data[1] === "" || !data[1] || data[1] === undefined){
           return data[0] === "surplus" ? false : data
        }
    })

    if(whatsMissing.length > 0) true
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

    res.send(showThem);
});

app.get('/users', UserController.list)

//USER
app.post('/create/user', async(req, res) => {
    const emptyPropertie = checkReqBody(req.body)
    
    if(emptyPropertie){
        console.log(`Corpo da requisição inválido.`, emptyPropertie)
        return res.status(400).json({
            status: 400,
            message: "Verifique se todos os campos do formulário estão devidamente preenchidos e tente novamente."
        })
    }

    const autenticado = await ckeckCredentials(req.body.admUser, req.body.admPassword);
  
    if(!autenticado){
        console.log("Usuário e/ou senha da conta administradoras são inválidas.")
        return res.status(401).json({
            status: 401,
            message: "Credenciais inválidas!"
        });
    }

    const { name, section, currentDate, surplus} = req.body;

    const created = await UserController.create(name, section, currentDate, surplus, res)

    if(created.statusCode !== 201) return

    console.log(`Cadastro realizado! Prosseguindo com as demais etapas de registro do ${name}...`)
    
    //registro de compra de café sem utilizar saldo, pois o usuário está sendo criado, surplusID = false
    await CoffeeRegisterController.create(name, currentDate, false)
    
    if(surplus > 0) {
        console.log(`Cadastrando o saldo de ${surplus} registro(s) do usuário ${name}`)
        //alimentar tabela aqui
        for (i = 0; i != surplus; i++) {
             await connection('surplus_tb')
                .insert({
                    userName: name,
                    surplusRegisterDate: currentDate,
                })
        }
    }

    console.log(`Cadastro de ${name} realizado com um total de ${surplus} registro(s) de saldo.`)
    
    return res.status(201).json({
        status: 201,
        message: 'Usuário cadastrado com sucesso!'
    })
})


app.delete('/remove', async(req, res) => {
    
    const emptyPropertie = checkReqBody(req.body)
    
    if(emptyPropertie){
        console.log(`Corpo da requisição inválido.`, emptyPropertie)
        return res.status(400).json({
            status: 400,
            message: "Verifique se todos os campos do formulário estão devidamente preenchidos e tente novamente."
        })
    }

    const autenticado = await ckeckCredentials(req.body.admUser, req.body.admPassword)
    
    if(!autenticado){
            console.log("Usuário e/ou senha da conta administradoras são inválidas.")
            return res.status(401).json({
                status: 401,
                message: "Credenciais inválidas!"
            });
        }
    console.log(await UserController.delete(req, res));

   
})

//COFFEE
app.post('/coffeeBought', async function (req, res) {
    const emptyPropertie = checkReqBody(req.body)
    
    if(emptyPropertie){
        console.log(`Corpo da requisição inválido.`, emptyPropertie)
        return res.status(400).json({
            status: 400,
            message: "Verifique se todos os campos do formulário estão devidamente preenchidos e tente novamente."
        })
    }

    const autenticado = await ckeckCredentials(req.body.admUser, req.body.admPassword)

    if(!autenticado){
        console.log("Usuário e/ou senha da conta administradoras são inválidas.\n\n")
        return res.status(401).json({
            status: 401,
            message: "Credenciais inválidas!"
        });
    }
  
        nameExists = await connection('users')
            .where('name', name)
            .first();

        if(!nameExists){
            console.log("Usuário não encontrado.\n\n")
            return res.status(404).json({
                status: 404,
                message: "Não foi possível identificar o usuário informado."
            });
        }

        const backDate = new Date().toLocaleDateString("pt-br", {
            dateStyle: 'short'
        })

        const date = currentDate

        if (date !== String(backDate)) {
           return res.status(401).json({
               status: 401,
               message: "A data da requisição e do backend diferem!"
           })
        }

        // fim da verificação da requisição

        hasSurplus = Object.values(await connection('surplus_tb')
                .where({
                    userName: name, 
                    used: 'false'
                })
        )

                //pega a posição do usuário que está querendo realizar registro de pagamento
        const userPosition = Object.values(await connection('users')
            .where('name', name)
            .select('position')
            .first())[0]

        const aheadAlready = Object.values(
            await connection('users')
            .where("name", name)
            .select("isAhead")
            .first()
        )[0]

        if(userPosition !== 1 && aheadAlready === "true"){
            console.log(`Falha ao registrar adiantamento de pagamento de ${name}. Usuário já adiantado.`)
            return res.status(403).json({
                status: 403,
                message: `Este usuário já adiantou um pagamento no ciclo atual. É permitido apenas um adiantamento por ciclo. Aguarde o fim do ciclo atual para adiantar o pagamento do usuário.` 
            })
        }
            
        let isAhead = userPosition !== 1 ? 'true' : 'false'
            
        //usuário não possui saldo mas está tentando registrar compra utilizando saldo
        if (hasSurplus.length === 0 && useSurplus === 'true') {
            console.log("Usuário não possui saldo para ser utilizado!\n\n")
            return res.status(401).json({
                status:401,
                message:'Não há saldo disponível para uso!'
            })
        } else if (hasSurplus.length > 0 && useSurplus === 'true') {
            console.log("Registrando compra utilizando saldo disponível...\n\n")
            //resgata o ID de um saldo válido para passá-lo no registro que será feito na tabela coffee_register
            
            const surplusID = Object.values(
                await connection('surplus_tb')
                    .where('surplusID', hasSurplus[0].surplusID)
                    .first()
            )[0]

            //recebe o ID do registro realizado na tabela coffee_register usando saldo
            coffeeRegisterID = await CoffeeRegisterController.create(name, date, surplusID, isAhead);
            console.log("Registro realizado com sucesso na tabela coffee_registers.\n\n")
            //atualiza a surplus_tb para remover saldo e indicar o ID do registro em que o saldo foi utilizado
            await connection('surplus_tb')
                .where('surplusID', surplusID)
                .update({
                    used: 'true',
                    usedInCoffeeRegister: coffeeRegisterID
                })
        } else {
            await CoffeeRegisterController.create(name, date, false, isAhead)
        }

        if (surplus > 0) {
            console.log("Adicionando saldo passado ao registrar a compra...\n\n")
            console.log("SURPLUS = ", surplus)
            for (i = 0; i != surplus; i++) {
                try {
                    await connection('surplus_tb')
                        .insert({
                            userName: name,
                            surplusRegisterDate: date,
                        })
                } catch (err) {
                    throw new Error('Não foi possível inserir o saldo.' + err.message)
                }
                console.log("passamos no loop ", i)
            }
        }
        console.log("Atualizando o saldo na tabela surplus_tb.\n\n")
        await UserController.update.saldo(name);
        console.log("Atualizando posição do usuário na tabela users.\n\n")
        await UserController.update.position(name, isAhead);
        console.log("Atualizando data da última aquisição do usuário na tabela users.\n\n")
        await UserController.update.lastCoffeeAcquisition(name, date)



        console.log("Registro de compra de café concluído com sucesso!\n\n")
        return res.status(201).json({
            status: 201,
            message: "Compra registrada e tabela atualizada!"
        });
})

app.listen(3300, function () {
    console.table('Servidor rodando na porta 3300')
})