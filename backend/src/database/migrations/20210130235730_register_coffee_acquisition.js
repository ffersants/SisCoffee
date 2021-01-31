
exports.up = function (knex) {
    return knex.schema.createTable('coffee_registers', function (table) {
        table.increments('paymentID');
        table.string('userID');
        table.string('userName');
        table.string('paymentRegisterDate');//dia do registro da compra do café

        table.foreign('userID').references('userID').inTable('users');
        table.foreign('userName').references('name').inTable('users');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('coffee_registers')
};
