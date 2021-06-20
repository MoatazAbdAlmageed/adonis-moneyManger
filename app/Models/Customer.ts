import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Transaction from "./Transaction";
import Reservation from "./Reservation";

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public phone: string;

  @column()
  public address: string;

  @column()
  public gender: string;

  @column()
  public bio: string;

  @column()
  public isCompleted: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relationships
   */
  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>;

  @hasMany(() => Reservation)
  public reservations: HasMany<typeof Reservation>;
}
