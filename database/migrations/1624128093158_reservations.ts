import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Reservations extends BaseSchema {
  protected tableName = "reservations";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("user_id");
      table.integer("customer_id");
      table.integer("bookable_id");
      table.float("quantity");
      table.float("price");
      table.text("notes").nullable();
      table.boolean("is_deleted").notNullable().defaultTo(true);
      table.timestamps(1);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
