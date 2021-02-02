const { first } = require('../database/connection');
const connection = require('../database/connection')

module.exports = {
    create: async function (name, date) {
        try {
            //informações do usuário que está pagando
            await connection('coffee_registers')
                .insert({
                    'userName': name,
                    'paymentRegisterDate': date
                })
        } catch (err) {
            throw new Error('Erro ao registrar a compra na tabela do banco de dados. ' + err)
        }
    }
}
