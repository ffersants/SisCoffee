
exports.up = function(knex) {
    return knex.schema.createTable('adm_tb', function (table) {
        table.string('userName').defaultTo('coffeeadm');
        table.string('password').defaultTo('2b510786f874878f94d2f03dd932e5bc');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adm_tb')
};
