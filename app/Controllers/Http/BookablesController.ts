import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Customer from "App/Models/Customer";
import Bookable from "App/Models/Bookable";

export default class BookablesController {
  public async index({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const bookables = await Bookable.query().paginate(page, limit);
    return view.render("bookables.index", { bookables });
  }
  public async edit(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const users = await User.all();
    const customers = await Customer.all();
    const bookable = await Bookable.find(params.id);
    return view.render("bookables.edit", { bookable, users, customers });
  }
  public async add(httpContextContract: HttpContextContract) {
    const users = await User.all();
    const customers = await Customer.all();
    const { view } = httpContextContract;
    return view.render("bookables.add", { users, customers });
  }

  public async store({ request, response, session }: HttpContextContract) {
    /**
     *  TODO:DRY same code used in update!
     * try to refactor this !
     */

    const validationSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      quantity: schema.number(),
      price: schema.number(),
    });

    try {
      const validationData = await request.validate({
        schema: validationSchema,
        messages: {
          "title.required": "title Is required",
          "description.required": "description Is required",
          "quantity.required": "quantity Is required",
          "price.required": "price Is required",
        },
      });
      Bookable.create(validationData);
      session.flash("notification", "Bookable Created!");
      response.redirect("/bookables");
    } catch (error) {
      return error;
      session.flash("error", error.messages);
      response.redirect("back");
    }
  }

  public async update({
    request,
    response,
    session,
    params,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      quantity: schema.number(),
      price: schema.number(),
    });
    const validationData = await request.validate({
      schema: validationSchema,
      messages: {
        "title.required": "title Is required",
        "description.required": "description Is required",
        "quantity.required": "quantity Is required",
        "price.required": "price Is required",
        "details.required": "details Is required",
      },
    });
    const { title, description, quantity, price, details } = validationData;
    const bookable = await Bookable.findOrFail(params.id);
    bookable.title = title;
    bookable.description = description;
    bookable.quantity = quantity;
    bookable.price = price;
    bookable.save();
    session.flash("notification", "Bookable Updated!");
    response.redirect("/bookables");
  }
  public async destroy({ response, session, params }: HttpContextContract) {
    const bookable = await Bookable.findOrFail(params.id);
    bookable.delete();
    session.flash("notification", "Bookable Deleted!");
    response.redirect("/bookables");
  }
}
