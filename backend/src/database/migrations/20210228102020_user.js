
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('userID');
        table.string('name');     
        table.string('section').notNullable();
        table.integer('surplus');
        table.integer('position').notNullable();
        table.string('signUpDate').notNullable();
        table.string('lastCoffeeAcquisition').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
