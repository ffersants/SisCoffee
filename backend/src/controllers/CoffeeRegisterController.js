// const { first } = require('../database/connection');
const connection = require('../database/connection')

module.exports = {
    create: async function (name, date, surplusID) {
        try {
            //registro de compra usando saldo
            if (surplusID) {
                    console.log(`\nRegistrando compra com saldo disponível.\n`)
                    await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': surplusID,
                    })
                //}

                return Object.values(await connection('coffee_registers')
                    .where('usingSurplus', surplusID)
                    .select('paymentID')
                    .first())[0]
            } else {
                //registro de pagamento sem saldo ou criação de usuário
                
                //criação de usuário com regsitro de pagamento
                    console.log(`\nRegistrando compra normal, sem saldo.\n`)
                    await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': 'false',
                    })
                //}   
            }

        } catch (err) {
            throw new Error('Erro ao registrar a compra na tabela do banco de dados. ' + err)
        }

    }
}
