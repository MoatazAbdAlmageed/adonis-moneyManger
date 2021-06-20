import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Customer from "App/Models/Customer";
import Transaction from "App/Models/Transaction";

export default class TransactionsController {
  public async index({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const transactions = await Transaction.query()
      .preload("user")
      .preload("customer")
      .paginate(page, limit);
    return view.render("transactions.index", { transactions });
  }
  public async edit(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const users = await User.all();
    const customers = await Customer.all();
    const transaction = await Transaction.find(params.id);
    return view.render("transactions.edit", { transaction, users, customers });
  }
  public async add(httpContextContract: HttpContextContract) {
    const users = await User.all();
    const customers = await Customer.all();
    const { view } = httpContextContract;
    return view.render("transactions.add", { users, customers });
  }

  public async store({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    /**
     *  TODO:DRY same code used in update!
     * try to refactor this !
     */

    const validationSchema = schema.create({
      amount: schema.number(),
      type: schema.string(),
      details: schema.string(),
    });

    try {
      const validationData = await request.validate({
        schema: validationSchema,
        messages: {
          "amount.required": "amount Is required",
          "type.required": "type Is required",
          "details.required": "details Is required",
        },
      });
      auth.user?.related("transactions").create({
        ...validationData,
        customerId: request.input("customerId"),
      });
      session.flash("notification", "Transaction Created!");
      response.redirect("/transactions");
    } catch (error) {
      return error;
    }
  }

  public async update({
    request,
    response,
    session,
    params,
    auth,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      customerId: schema.number(),
      amount: schema.number(),
      type: schema.string(),
      details: schema.string(),
    });
    const validationData = await request.validate({
      schema: validationSchema,
      messages: {
        "customerId.required": "customerId Is required",
        "amount.required": "amount Is required",
        "type.required": "type Is required",
        "details.required": "details Is required",
      },
    });
    const { customerId, amount, type, details } = validationData;
    // TODO:update only related
    const transaction = await Transaction.findOrFail(params.id);
    transaction.customerId = customerId;
    transaction.amount = amount;
    transaction.type = type;
    transaction.details = details;
    transaction.save();
    session.flash("notification", "Transaction Updated!");
    response.redirect("/transactions");
  }
  public async destroy({ response, session, params }: HttpContextContract) {
    const transaction = await Transaction.findOrFail(params.id);
    transaction.delete();
    session.flash("notification", "Transaction Deleted!");
    response.redirect("/transactions");
  }
}
