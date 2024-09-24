export function up(knex) {
  return knex.schema.createTable("my_classes", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("user");
    table.integer("class_id").unsigned().references("id").inTable("classes");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("my_classes");
}
