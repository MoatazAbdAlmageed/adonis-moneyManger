import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Customer from "App/Models/Customer";
import Reservation from "App/Models/Reservation";
import Bookable from "App/Models/Bookable";

export default class ReservationsController {
  public async index({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const reservations = await Reservation.query().paginate(page, limit);
    return view.render("reservations.index", { reservations });
  }
  public async show(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const users = await User.all();
    const customers = await Customer.all();
    const reservation = await Reservation.find(params.id);
    const bookables = await Bookable.all();
    return view.render("reservations.edit", {
      reservation,
      users,
      customers,
      bookables,
    });
  }

  public async add(httpContextContract: HttpContextContract) {
    const users = await User.all();
    const customers = await Customer.all();
    const bookables = await Bookable.all();
    const { view } = httpContextContract;
    return view.render("reservations.add", { users, customers, bookables });
  }

  public async store({ request, response, session }: HttpContextContract) {
    /**
     *  TODO:DRY same code used in update!
     * try to refactor this !
     */

    const validationSchema = schema.create({
      user_id: schema.number(),
      customer_id: schema.number(),
      bookable_id: schema.number(),
      quantity: schema.number(),
      price: schema.number(),
      notes: schema.string(),
    });

    try {
      const validationData = await request.validate({
        schema: validationSchema,
        messages: {
          "user_id.required": "user_id Is required",
          "customer_id.required": "customer_id Is required",
          "bookable_id.required": "bookable_id Is required",
          "quantity.required": "quantity Is required",
          "price.required": "price Is required",
          "notes.required": "notes Is required",
        },
      });
      Reservation.create(validationData);
      session.flash("notification", "Reservation Created!");
      response.redirect("/reservations");
    } catch (error) {
      return error;
    }
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      user_id: schema.number(),
      customer_id: schema.number(),
      bookable_id: schema.number(),
      quantity: schema.number(),
      price: schema.number(),
      notes: schema.string(),
    });
    try {
      const validationData = await request.validate({
        schema: validationSchema,
        messages: {
          "user_id.required": "user_id Is required",
          "customer_id.required": "customer_id Is required",
          "bookable_id.required": "bookable_id Is required",
          "quantity.required": "quantity Is required",
          "price.required": "price Is required",
          "notes.required": "notes Is required",
        },
      });
      const { user_id, customer_id, bookable_id, quantity, price, notes } =
        validationData;
      const reservation = await Reservation.findOrFail(params.id);
      reservation.user_id = user_id;
      reservation.customer_id = customer_id;
      reservation.bookable_id = bookable_id;
      reservation.quantity = quantity;
      reservation.price = price;
      reservation.notes = notes;
      // TODO:save dateOfBirth
      reservation.save();
      session.flash("notification", "Reservation Updated!");
      response.redirect("/reservations");
    } catch (error) {
      return error;
    }
  }
  public async destroy({ response, session, params }: HttpContextContract) {
    const reservation = await Reservation.findOrFail(params.id);
    reservation.delete();
    session.flash("notification", "Reservation Deleted!");
    response.redirect("/reservations");
  }
}
