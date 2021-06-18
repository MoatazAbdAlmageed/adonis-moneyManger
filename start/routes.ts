import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "UsersController.list").as("users");
Route.post("/user/:name?", "UsersController.show").as("user");
