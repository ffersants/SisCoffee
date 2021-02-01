const connection = require('../database/connection')

module.exports = {
    create: async function (req, res) {
        //informações do usuário que está pagando
        let user = req.body;
        user = user.name

        try {
            await mainSort(user)
                .then((position) => {
                    res.status(200).send('A nova posição do usuário é ' + position)
                })
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
    }
}
