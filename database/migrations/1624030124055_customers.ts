import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Customers extends BaseSchema {
  protected tableName = "customers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.text("bio");
      table.string("avatar");
      table.enum("gender", ["Male", "Female"]);
      table.date("dateOfBirth");
      table.timestamps(1);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}