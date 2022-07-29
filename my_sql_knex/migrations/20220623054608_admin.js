
exports.up = function(knex) {
    return knex.schema.createTable('admin', (table) => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('status').defaultTo(true);
        table.boolean('delete').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin')
};
