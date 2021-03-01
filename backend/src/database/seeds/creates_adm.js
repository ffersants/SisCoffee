
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('adm_tb').del()
    .then(function () {
      // Inserts seed entries
      return knex('adm_tb').insert([
      {
         userName: 'coffeeadm', 
          password: '0f3aa814208a1e17417fd762dcb599f5'
      }
      ]);
    });
};
