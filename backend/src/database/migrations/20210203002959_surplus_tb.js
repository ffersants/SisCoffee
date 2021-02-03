
exports.up = function (knex) {
    return knex.schema.createTable('surplus_tb', function (table) {
        table.increments('surplusID');
        table.string('userName');
        table.string('surplusRegisterDate');
        table.string('used').defaultTo('false');
        table.string('usedInCoffeeRegister');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('surplus_tb')
};
