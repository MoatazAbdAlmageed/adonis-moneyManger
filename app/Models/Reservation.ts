import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Customer from "./Customer";

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public customerId: number;

  @column()
  public bookableId: number;

  @column()
  public quantity: number;

  @column()
  public price: number;

  @column()
  public notes: string;
  @column()
  public is_deleted: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>;
}
