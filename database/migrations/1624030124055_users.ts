import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Users extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.date("dateOfBirth").notNullable();
      table.boolean("is_completed").defaultTo(0);
      table.timestamps(1);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
