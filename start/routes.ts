import Route from "@ioc:Adonis/Core/Route";

/**
 * Auth
 */
Route.get("/login", "AuthController.showLogin").middleware("guest");
Route.post("/login", "AuthController.login");

Route.post("/logout", "AuthController.logout");

Route.get("/register", "AuthController.showRegister").middleware("guest");
Route.post("/register", "AuthController.register");

Route.group(() => {
  Route.get("/", "DashboardController.dashboard");

  /**
   * TransactionsController
   */

  Route.get("/transactions", "TransactionsController.index").as("transactions");
  Route.get("transactions/add", "TransactionsController.add").as(
    "addTransaction"
  );
  Route.get("transactions/:id?", "TransactionsController.edit");
  Route.post("transactions/", "TransactionsController.store");
  Route.patch("transactions/:id", "TransactionsController.update");
  Route.delete("transactions/:id", "TransactionsController.destroy");
  /**
   * BookablesController
   */

  Route.get("/bookables", "BookablesController.index").as("bookables");
  Route.get("bookables/add", "BookablesController.add").as("addBookable");
  Route.get("bookables/:id?", "BookablesController.edit");
  Route.post("bookables/", "BookablesController.store");
  Route.patch("bookables/:id", "BookablesController.update");
  Route.delete("bookables/:id", "BookablesController.destroy");
  /**
   * ReservationsController
   */
  Route.get("/reservations", "ReservationsController.index").as("reservations");
  Route.get("reservations/add", "ReservationsController.add").as(
    "addReservation"
  );
  Route.get("reservations/:id?", "ReservationsController.edit");
  Route.post("reservations/", "ReservationsController.store");
  Route.patch("reservations/:id", "ReservationsController.update");
  Route.delete("reservations/:id", "ReservationsController.destroy");

  /**
   * CustomersController
   */
  Route.get("customers", "CustomersController.index").as("customers");
  Route.get("customers/add", "CustomersController.add").as("addCustomer");
  Route.get("customers/:id?", "CustomersController.edit");
  Route.post("customers/", "CustomersController.store");
  Route.patch("customers/:id", "CustomersController.update");
  Route.delete("customers/:id", "CustomersController.destroy");

  /**
   * UsersController
   */
  Route.get("users", "UsersController.index").as("users");
  Route.get("users/add", "UsersController.add").as("addUser");
  Route.get("users/:id?", "UsersController.edit");
  Route.post("users/", "UsersController.store");
  Route.patch("users/:id", "UsersController.update");
  Route.delete("users/:id", "UsersController.destroy");
}).middleware("auth");
