import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "UsersController.index").as("users");
Route.get("/add", "UsersController.add").as("addUser");
Route.get("/:id?", "UsersController.show");
Route.post("/", "UsersController.store");
Route.patch("/:id", "UsersController.update");
Route.delete("/:id", "UsersController.destroy");
