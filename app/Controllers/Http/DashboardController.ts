import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Bookable from "App/Models/Bookable";
import Customer from "App/Models/Customer";
import Reservation from "App/Models/Reservation";
import Transaction from "App/Models/Transaction";
import User from "App/Models/User";

export default class DashboardController {
  public async dashboard({ view }: HttpContextContract) {
    const bookables = await (await Bookable.all()).length;
    const transactions = await (await Transaction.all()).length;
    const reservations = await (await Reservation.all()).length;
    const customers = await (await Customer.all()).length;
    const users = await (await User.all()).length;
    return view.render("dashboard", {
      transactions,
      reservations,
      customers,
      bookables,
      users,
    });
  }
}
