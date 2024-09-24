export function up(knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("user");
    table.string("type").notNullable();
    table.string("location").notNullable();
    table.string("time").notNullable();
    table.string("level").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("classes");
}
