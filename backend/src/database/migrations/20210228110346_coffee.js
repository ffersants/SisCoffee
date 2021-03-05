
exports.up = function (knex) {
    return knex.schema.createTable('coffee_registers', function (table) {
        table.increments('paymentID');
        table.string('userName').notNullable()
        table.string('paymentRegisterDate').notNullable();//dia do registro da compra do café
        table.string('usingSurplus').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('coffee_registers')
};
