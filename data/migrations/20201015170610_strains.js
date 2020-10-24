
exports.up = function(knex) {
  return knex.schema.createTable('strains', strains => {
    strains
        .increments()
    strains
        .string('Strain',64)
            .notNullable()
    strains
        .string('Ailment')
    strains
        .string('Type', 64)
            .notNullable();
    strains
        .integer('Rating');
    strains
        .string('Effects_x',128)
    strains
        .string('Effects_y',128)
    strains
        .string('Flavor')
    strains 
        .text('Description')   
    strains
         .string('Image_Url')   
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
