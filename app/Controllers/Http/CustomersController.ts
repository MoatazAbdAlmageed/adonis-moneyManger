import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Customer from "App/Models/Customer";

export default class CustomersController {
  public async index({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const customers = await Customer.query().paginate(page, limit);
    return view.render("customers/index", { customers });
  }

  public async edit(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const customer = await Customer.find(params.id);
    return view.render("customers/edit", { customer });
  }
  public async add(httpContextContract: HttpContextContract) {
    const { view } = httpContextContract;
    return view.render("customers/add");
  }

  public async store({ request, response, session }: HttpContextContract) {
    /**
     *  TODO:DRY same code used in update!
     * try to refactor this !
     */
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      email: schema.string(),
      gender: schema.string(),
      phone: schema.string(),
      address: schema.string(),
    });

    try {
      const validationData = await request.validate({
        schema: validationSchema,
        messages: {
          "name.required": "Name Is required",
          "name.maxLength": "Name maxLength is 255",
          "name.minLength": "Name minLength is 5",
          "email.required": "Email Is required",
          "phone.required": "Phone Is required",
          "adress.required": "Adress Is required",
        },
      });
      const { name, email, gender, phone, address } = validationData;

      Customer.create({
        name,
        email,
        gender,
        phone,
        address,
        bio: request.input("bio"),
      });

      session.flash("notification", "Customer Created!");
      response.redirect("/customers");
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
      name: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      email: schema.string(),
      gender: schema.string(),
      phone: schema.string(),
      address: schema.string(),
    });

    const validationData = await request.validate({
      schema: validationSchema,
      messages: {
        "name.required": "Name Is required",
        "name.maxLength": "Name maxLength is 255",
        "name.minLength": "Name minLength is 5",
        "email.required": "Email Is required",
        "phone.required": "Phone Is required",
        "address.required": "Address Is required",
      },
    });
    const { name, email, gender, phone, address } = validationData;
    const customer = await Customer.findOrFail(params.id);
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;
    customer.gender = gender;
    customer.bio = request.input("bio");
    customer.save();
    session.flash("notification", "Customer Updated!");
    response.redirect("/customers");
  }
  public async destroy({ response, session, params }: HttpContextContract) {
    const customer = await Customer.findOrFail(params.id);
    customer.delete();
    session.flash("notification", "Customer Deleted!");
    response.redirect("/customers");
  }
}
