
exports.up = function (knex) {
    return knex.schema.createTable('coffee_registers', function (table) {
        table.increments('paymentID');
        table.string('userName');
        table.string('paymentRegisterDate');//dia do registro da compra do café
        table.string('usingSurplus');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('coffee_registers')
};
