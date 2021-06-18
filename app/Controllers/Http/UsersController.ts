import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UsersController {
  public async index({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const users = await Database.from("users")
      .select("*")
      .orderBy("id", "desc") // 👈 get latest first
      .paginate(page, limit); // 👈 paginate using page numbers
    // return users;
    return view.render("index", { users });
  }

  public async show(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const user = await User.find(params.id);
    return view.render("edit", { user });
  }
  public async add(httpContextContract: HttpContextContract) {
    const { view } = httpContextContract;
    return view.render("add");
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
    });

    const validationData = await request.validate({
      schema: validationSchema,
      messages: {
        "name.required": "Name Is required",
        "name.maxLength": "Name maxLength is 255",
        "name.minLength": "Name minLength is 5",
        "email.required": "Email Is required",
      },
    });
    const { name, email, gender } = validationData;
    User.create({
      name,
      email,
      gender,
      avatar: request.input("avatar"),
      bio: request.input("bio"),
      // TODO:save dateOfBirth
      // dateOfBirth,
    });
    session.flash("notification", "Customer Created!");
    response.redirect("/");
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
    });

    const validationData = await request.validate({
      schema: validationSchema,
      messages: {
        "name.required": "Name Is required",
        "name.maxLength": "Name maxLength is 255",
        "name.minLength": "Name minLength is 5",
        "email.required": "Email Is required",
      },
    });
    const { name, email, gender } = validationData;
    const user = await User.findOrFail(params.id);
    user.name = name;
    user.email = email;
    user.gender = gender;
    user.avatar = request.input("avatar");
    user.bio = request.input("bio");
    // TODO:save dateOfBirth
    user.save();
    session.flash("notification", "Customer Updated!");
    response.redirect("/");
  }
  public async destroy({ response, session, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    user.delete();
    session.flash("notification", "Customer Deleted!");
    response.redirect("/");
  }
}
