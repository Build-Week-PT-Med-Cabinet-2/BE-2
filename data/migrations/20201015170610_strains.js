
exports.up = function(knex) {
  return knex.schema.createTable('strains', strains => {
    strains
        .increments()
    strains
        .string('strain',64)
            .unique()
            .notNullable();
    strains
        .string('type', 64)
            .notNullable();
    strains
        .integer('raiting');
    strains
        .string('effects')
            .notNullable();
    strains
        .string('flavor')
            .notNullable();
    strains 
        .text('description')
            .notNullable();    
            
    strains
        .integer('user_id')
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
