const connection = require('../database/connection')


module.exports = {
    create: async function (req, res) {
        try {
            const { name, section, signUpDate } = req.body;
            console.log(req.body)
            if (!name || !section || !signUpDate) {
                throw new Error('Informações como usuário, seção e/ou data de inscrição não preenchida(s) para cadastro do usuário.')
            }

            backDate = new Date().toLocaleDateString("pt-br", {
                dateStyle: 'short'
            })

            // if (signUpDate !== String(backDate)) {
            //     throw new Error(`A data da requisição e do backend diferem!`)
            // }

            const allUsers = await connection('users')
                .select('name');

            allUsers.forEach(user => {
                if (user.name === name) {
                    throw new Error('Nome já em uso!')
                }
            })
            const position = allUsers.length + 1
            const surplus = 0;
            const lastCoffeeAcquisition = signUpDate;
            await connection('users').insert({
                name,
                section,
                surplus,
                position,
                signUpDate,
                lastCoffeeAcquisition
            })
            return res.json({
                status: 201,
                message: 'Usuário cadastrado com sucesso!'
            })
        } catch (err) {
            return res.status(500).json({
                //nothing changed
                message: 'Ops! Um erro aqui na hora de criar o(a) usuário(a).' + err
            })
        }

    },
    list: async function (req, res) {
        const users = await connection('users').select('*').orderBy('position', 'asc')
        return res.json(users)
    },
    delete: async function (req, res) {
        const { userID } = req.params;
        await connection('users')
            .where('userID', userID)
            .delete();
        return res.status(200).send('Usuário removido com sucesso!')
    },
    update: {
        position: async function (user) {
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
                    .update({ position: totalUsers.length })

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