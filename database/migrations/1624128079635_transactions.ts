import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Transactions extends BaseSchema {
  protected tableName = "transactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("user_id");
      table.integer("customer_id").nullable();
      table.float("amount");
      table.enum("type", ["expense", "revenue"]);
      table.text("details").nullable();
      table.boolean("is_deleted").notNullable().defaultTo(false);
      table.timestamps(1);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
