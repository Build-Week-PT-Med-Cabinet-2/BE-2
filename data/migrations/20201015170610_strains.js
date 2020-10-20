
exports.up = function(knex) {
  return knex.schema.createTable('strains', strains => {
    strains
        .increments()
    strains
        .string('strain',64)
            .unique()
            .notNullable();
    strains
        .string('Type', 64)
            .notNullable();
    strains
        .integer('Raiting');
    strains
        .string('Effects')
            .notNullable();
    strains
        .string('Flavor')
            .notNullable();
    strains 
        .text('Description')
            .notNullable();    
            
    strains
        .integer('user-id')
        .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");        

  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('strains');
};
