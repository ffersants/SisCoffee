
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('userID');
        table.string('name');
        table.string('section');
        table.string('signUpDate');
        table.string('surplus');
        table.string('position');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
