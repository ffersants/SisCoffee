const connection = require('../database/connection')

module.exports = {
    create: async function (name, section, currentDate, surplus, res) {
        try{
            //verifica se ação está autenticada corretamente
            
            backDate = new Date().toLocaleDateString("pt-br", {
                dateStyle: 'short'
            })

            if (currentDate !== String(backDate)) {
                console.log("A data da requisição e do backend diferem!")
                return res.status(400).json({
                    status: 400,
                    message:`A data da requisição e do backend diferem!`
                }).send()
            }

            const allUsersRegistered = await connection('users')
                .select('name');

            let userAlreadyExists;
            
            allUsersRegistered.forEach(user => {
                if (user.name === name) {
                    userAlreadyExists = true                    
                }
            })
   
            if(userAlreadyExists){
                console.log(`Não foi possível cadastrar o usuário ${name}. Nome já registrado!`)
                return res.status(409).json({
                    status: 409,
                    message: "Nome já em uso."
                }).send()
            }

            const position = allUsersRegistered.length + 1
            
            const lastCoffeeAcquisition = currentDate;
            
            const signUpDate = currentDate;
            
            await connection('users').insert({
                name,
                section,
                surplus,
                position,
                signUpDate,
                lastCoffeeAcquisition
            })

            return res.status(201)
        } catch(e){
            console.log("FALHA INTERNA NO SERVIDOR -> ", e)
            return res.status(500).json({
                status: 500,
                message: "Erro interno no servidor. Favor contatar o admnistrador do sistema."
            })
        }
    },
    list: async function (req, res) {
        const users = await connection('users').select('*').orderBy('position', 'asc')
        return res.json(users)
    },
    delete: async function (req, res) {
        const {name} = req.body;
      
        const userName = await connection('users')
            .where('name', name)
            .select('name')
            .first()

        if(!userName){
            console.log(`Nenhum usuário com o nome ${name} foi encontrado.`)
            return res.status(404).json({
                status: 404,
                message: "O usuário que você está tentando deletar não existe!"
            })
        }
        
        const hasSurplus = (await connection('surplus_tb')
                .where({
                    userName: userName.name,
                    used: 'false'
                })
            ).length

        if(hasSurplus !== 0){
            return res.status(401).json({
                status: 401,
                message: "Não é possível excluir um usuário que ainda possui saldo a ser utilizado."
            })
        }

        await connection('users')
            .where('name', name)
            .delete();

        return res.status(201).json({
            status: 201,
            message:'Usuário removido com sucesso!'
        })
    },
    update: {
        position: async function (user, isAhead) {
            //informações do usuário que está pagando
            try {
                const totalUsers = await connection('users').select('name');

                const userPosition = (await connection('users')
                    .where('name', user)
                    .select('position')
                    .first()).position

                await organizeTable(userPosition, totalUsers.length)

                //teremos dois registros na mesma posição após a organização da tabela,
                //então, o usuário que pagou será colocado em última posição com o código abaixo
                await connection('users')
                    .where('name', user)
                    .select('position')
                    .update({ 
                        position: totalUsers.length,
                        isAhead: isAhead 
                    })

            } catch (err) {
                console.error('Isso é um erro: ' + err)
            }
            ///////////////////METHODS
            async function organizeTable(userPosition, totalPositions) {
                //i = position dá uma noção de a partir de qual posição devemos reorganizar
                for (i = userPosition; i !== totalPositions; i++) {
                    await connection('users')
                        .where('position', i + 1)
                        .update({ position: i })
                }
            }
        },
        lastCoffeeAcquisition: async function (name, date) {
            try {
                await connection('users')
                    .where('name', name)
                    .update({ lastCoffeeAcquisition: date })
            } catch (err) {
                throw new Error('Falha ao atualizar a coluna lastCoffeeAcquisition.' + err)
            }
        },
        saldo: async function (name) {

            try {

                const surplusInTable = Object.values(await connection('surplus_tb')
                    .where('userName', name)
                    .where('used', 'false')).length;

                await connection('users')
                    .where('name', name)
                    .select('surplus')
                    .update({ surplus: surplusInTable})

            } catch (err) {
                throw new Error('Falha na hora de registrar o saldo no banco.' + err)
            }


        }
    }
}