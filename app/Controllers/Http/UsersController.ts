import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UsersController {
  public list({ view, params: { name } }: HttpContextContract) {
    console.log("\n".repeat(5));
    console.log("************ list **************");
    return view.render("user", { name });
  }
}
