exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users
        .increments();
      users
        .string('username', 255)
        .notNullable()
        .unique();
      users
        .string('password', 255)
        .notNullable();
      users
        .string('firstname',64);
      users
        .string('lastname', 64);
      users
        .string('email',255);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  