
exports.up = function(knex) {
    return knex.schema.createTable('adm_tb', function (table) {
        table.string('userName').defaultTo('coffeeadm');
        table.string('password').defaultTo('81713ae400988a28e188f0fe3f1dd2f0');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adm_tb')
};
