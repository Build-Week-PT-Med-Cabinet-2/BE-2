const knex = require('knex');
const environment = process.env.ENVIRONMENT
const knexConfig = require('../knexfile.js')[environment];

module.exports = knex(knexConfig);
