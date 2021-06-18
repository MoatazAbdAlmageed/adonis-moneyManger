import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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

  public show(httpContextContract: HttpContextContract) {
    const { params, view } = httpContextContract;
    const name = params.name;
    return view.render("user", { name });
  }

  public async store(httpContextContract: HttpContextContract) {
    const { request, response } = httpContextContract;
    const { name, email, dateOfBirth } = request.body();
    User.create({
      name,
      email,
      // TODO:save dateOfBirth
      // dateOfBirth,
    });
    response.redirect("back");
  }
}
