import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Customers extends BaseSchema {
  protected tableName = "customers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("address").notNullable();
      table.text("bio").nullable();
      table.enum("gender", ["Male", "Female"]);
      table.boolean("is_deleted").notNullable().defaultTo(false);
      table.timestamps(1);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
