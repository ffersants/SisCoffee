exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
        table.string('email').nullable();
    })
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table){
      table.dropColumn('email');
  })
};