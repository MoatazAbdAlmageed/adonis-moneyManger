import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Bookables extends BaseSchema {
  protected tableName = "bookables";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title");
      table.text("description");
      table.float("quantity");
      table.float("price");
      table.boolean("is_deleted").notNullable().defaultTo(true);
      table.timestamps(1);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
