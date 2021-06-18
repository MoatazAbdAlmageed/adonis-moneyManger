import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UsersController {
  public async list({ view, request }: HttpContextContract) {
    const limit = 5;
    const page = request.input("page", 1);
    const users = await Database.from("users")
      .select("*")
      .orderBy("id", "desc") // 👈 get latest first
      .paginate(page, limit); // 👈 paginate using page numbers
    // return users;
    return view.render("users", { users: users });
  }

  public show(httpContextContract: HttpContextContract) {
    const { request, view } = httpContextContract;
    const name = request.body().name;
    return view.render("user", { name });
  }
}
