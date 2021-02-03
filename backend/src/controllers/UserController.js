const connection = require('../database/connection')


module.exports = {
    create: async function (req, res) {
        try {
            const { name, section, signUpDate } = req.body
            if (!name || !section || !signUpDate) {
                throw new Error('Informações como usuário, seção e/ou data de inscrição não preenchida(s) para cadastro de compra.')
            }

            backDate = new Date().toLocaleDateString("pt-br", {
                dateStyle: 'short'
            })

            if (signUpDate !== String(backDate)) {
                throw new Error(`A data da requisição e do backend diferem!`)
            }

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
            return res.status(201).send('Usuário cadastrado')
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
                await mainSort(user)
            } catch (err) {
                console.error('Isso é um erro: ' + err)
            }

            ///////////////////METHODS
            async function mainSort(userName) {
                //pega o número total de usuários cadastrados
                const totalPositions = (await connection('users').select('name')).length;
                const userPosition = (await connection('users')
                    .where('name', userName)
                    .select('position')
                    .first()).position

                await organizeTable(userPosition, totalPositions)

                //pega o primeiro e coloca-o em último

                const newPosition = await connection('users')
                    .where('name', userName)
                    .select('position')
                    .update({ position: totalPositions })
                    .then(async () => {
                        let currentPosition = await connection('users')
                            .where('name', userName)
                            .select('position')
                            .first()
                        return currentPosition
                    })

                return newPosition.position
            }

            async function organizeTable(userPosition, totalPositions) {
                //i = position dá uma noção de a partir de qual posição devemos reorganizar
                for (i = userPosition; i != totalPositions; i++) {
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
        saldo: async function (name, saldo, surplusDate) {
            try {
                const surplusInTable = Object.values(await connection('users')
                    .where('name', name)
                    .select('surplus')
                    .first())[0];
                console.log(saldo)
                console.log(surplusInTable)
                await connection('users')
                    .where('name', name)
                    .select('surplus')
                    .update({ surplus: surplusInTable + saldo })

            } catch (err) {

            }


        }
    }
}