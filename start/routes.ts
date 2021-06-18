import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "UsersController.index").as("users");
Route.get("/user/:name?", "UsersController.show");
Route.post("/", "UsersController.store");
