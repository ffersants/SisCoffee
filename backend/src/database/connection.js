
const configuration = require('../../knexfile');
const knex = require('knex');

// const connection = knex(configuration.development);
const connection = knex(configuration.production);

module.exports = connection;