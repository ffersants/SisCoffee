
exports.up = function(knex) {
    return knex.schema.createTable('adm_tb', function (table) {
        table.string('userName').notNullable()
        table.string('password').notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adm_tb')
};
