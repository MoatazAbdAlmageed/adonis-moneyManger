import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UsersController {
  public async index({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const users = await User.query().paginate(page, limit);
    return view.render("users/index", { users });
  }

  public async edit(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const user = await User.find(params.id);
    return view.render("users/edit", { user });
  }
  public async add(httpContextContract: HttpContextContract) {
    const { view } = httpContextContract;
    return view.render("users/add");
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
      password: schema.string(),
    });

    try {
      const validationData = await request.validate({
        schema: validationSchema,
        messages: {
          "name.required": "Name Is required",
          "name.maxLength": "Name maxLength is 255",
          "name.minLength": "Name minLength is 5",
          "email.required": "Email Is required",
          "gender.required": "Gender Is required",
          "phone.required": "Phone Is required",
          "address.required": "address Is required",
          "password.required": "password Is required",
        },
      });

      const { name, email, gender, phone, address, password } = validationData;
      User.create({
        name,
        email,
        gender,
        phone,
        address,
        password,
        bio: request.input("bio"),
      });

      session.flash("notification", "User Created!");
      response.redirect("/users");
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
        "gender.required": "Gender Is required",
        "phone.required": "Phone Is required",
        "address.required": "Address Is required",
      },
    });
    const { name, email, gender, phone, address } = validationData;
    const user = await User.findOrFail(params.id);
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.gender = gender;
    user.bio = request.input("bio");
    user.save();
    session.flash("notification", "User Updated!");
    response.redirect("/users");
  }
  public async destroy({ response, session, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    user.delete();
    session.flash("notification", "User Deleted!");
    response.redirect("/users");
  }
}
