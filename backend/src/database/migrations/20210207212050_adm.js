
exports.up = function(knex) {
    return knex.schema.createTable('adm_tb', function (table) {
        table.string('userName').defaultTo('coffeeadm');
        table.string('password').defaultTo('4fe879f30bca10fdd4b8cd12288d788b');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adm_tb')
};
