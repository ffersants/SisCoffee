const { first } = require('../database/connection');
const connection = require('../database/connection')

module.exports = {
    create: async function (name, date, surplusID) {

        try {
            if (surplusID) {
                //informações do usuário que está pagando
                await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': surplusID
                    })

                return Object.values(await connection('coffee_registers')
                    .where('usingSurplus', surplusID)
                    .select('paymentID')
                    .first())[0]
            } else {
                //informações do usuário que está pagando
                await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': 'no'
                    })
            }

        } catch (err) {
            throw new Error('Erro ao registrar a compra na tabela do banco de dados. ' + err)
        }

    }
}
