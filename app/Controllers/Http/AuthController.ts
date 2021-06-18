import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
export default class AuthController {
  public async showRegister({ view }: HttpContextContract) {
    return view.render("auth/register");
  }

  public async register({
    request,
    response,
    session,
    auth,
  }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.maxLength(255),
        rules.minLength(5),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
    });

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        "name.required": "Name Is required",
        "password.required": "Password Is required",
        "name.maxLength": "Name maxLength is 255",
        "name.minLength": "Name minLength is 5",
        "email.required": "Email Is required",
      },
    });

    const user = await User.create(validatedData);
    await auth.login(user);
    session.flash("notification", "User Registered!");
    response.redirect("/customers");
  }

  public async showLogin({ view }: HttpContextContract) {
    return view.render("auth/login");
  }

  public async login({
    auth,
    request,
    response,
    session,
  }: HttpContextContract) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
      session.flash("notification", "User Registered!");
      response.redirect("/customers");
    } catch (error) {
      // return error;
      session.flash("notification", "User not found!");
      response.redirect("back");
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    auth.logout();
    response.redirect("/customers");
  }
}
