
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('userID');
        table.string('name');
        table.string('section');
        table.integer('surplus');
        table.integer('position');
        table.string('signUpDate');
        table.string('lastCoffeeAcquisition');
        table.string('isAhead');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
