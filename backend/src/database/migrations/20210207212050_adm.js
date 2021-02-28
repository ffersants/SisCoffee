
exports.up = function(knex) {
    return knex.schema.createTable('adm_tb', function (table) {
        table.string('userName').defaultTo('coffeeadm');
        table.string('password').defaultTo('0f3aa814208a1e17417fd762dcb599f5');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adm_tb')
};
