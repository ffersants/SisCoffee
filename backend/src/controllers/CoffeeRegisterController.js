// const { first } = require('../database/connection');
const connection = require('../database/connection')

module.exports = {
    create: async function (name, date, surplusID, isAhead) {
        try {
           
            //registro de compra usando saldo
            if (surplusID) {
                //caso a razão do registro seja apenas um pagamento, não a criação de usuário,
                //e a posição desse usuário foi diferente de 1, então ele está adiantando seu pagamento 
                if(isAhead){
                    await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': surplusID,
                        'isAhead': 'true'
                    })
                } else{
                    //criação de usuário
                    await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': surplusID,
                        'isAhead': 'false'
                    })
                }

                return Object.values(await connection('coffee_registers')
                    .where('usingSurplus', surplusID)
                    .select('paymentID')
                    .first())[0]
            } else {
                //registro de pagamento sem saldo ou criação de usuário

                if(isAhead){
                    //ação de registro de pagamento adiantado
                    await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': 'false',
                        'isAhead': 'true'
                    })
                } else{
                    //criação de usuário com regsitro de pagamento
                    await connection('coffee_registers')
                    .insert({
                        'userName': name,
                        'paymentRegisterDate': date,
                        'usingSurplus': 'false',
                        'isAhead': 'false'
                    })
                }   
            }

        } catch (err) {
            throw new Error('Erro ao registrar a compra na tabela do banco de dados. ' + err)
        }

    }
}
