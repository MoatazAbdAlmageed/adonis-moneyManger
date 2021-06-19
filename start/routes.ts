import Route from "@ioc:Adonis/Core/Route";

/**
 * Auth
 */
Route.get("/login", "AuthController.showLogin");
Route.post("/login", "AuthController.login");

Route.post("/logout", "AuthController.logout");

Route.get("/register", "AuthController.showRegister");
Route.post("/register", "AuthController.register");

Route.group(() => {
  /**
   * CustomersController
   */
  Route.get("/", "CustomersController.index").as("customers");
  Route.get("customers/add", "CustomersController.add").as("addCustomer");
  Route.get("customers/:id?", "CustomersController.show");
  Route.post("customers/", "CustomersController.store");
  Route.patch("customers/:id", "CustomersController.update");
  Route.delete("customers/:id", "CustomersController.destroy");
}).middleware("auth");
