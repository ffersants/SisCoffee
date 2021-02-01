const connection = require('../database/connection')


module.exports = {
    create: async function (req, res) {
        const { name, section, signUpDate } = req.body
        const allUsers = await connection('users')
            .select('name');

        allUsers.forEach(user => {
            if (user.name === name) {
                return res.status(409).json({ error: "User already exists" })
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
    }
}