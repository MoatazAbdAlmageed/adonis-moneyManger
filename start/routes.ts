import Route from "@ioc:Adonis/Core/Route";

/**
 * Auth
 */
Route.get("/", "AuthController.dashboard");
Route.get("/login", "AuthController.showLogin").middleware("guest");
Route.post("/login", "AuthController.login");

Route.post("/logout", "AuthController.logout");

Route.get("/register", "AuthController.showRegister").middleware("guest");
Route.post("/register", "AuthController.register");

Route.group(() => {
  /**
   * TransactionsController
   */

  Route.get("/transactions", "TransactionsController.index").as("transactions");
  Route.get("transactions/add", "TransactionsController.add").as(
    "addTransaction"
  );
  Route.get("transactions/:id?", "TransactionsController.show");
  Route.post("transactions/", "TransactionsController.store");
  Route.patch("transactions/:id", "TransactionsController.update");
  Route.delete("transactions/:id", "TransactionsController.destroy");
  /**
   * BookablesController
   */

  Route.get("/bookables", "BookablesController.index").as("bookables");
  Route.get("bookables/add", "BookablesController.add").as("addBookable");
  Route.get("bookables/:id?", "BookablesController.show");
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
  Route.get("reservations/:id?", "ReservationsController.show");
  Route.post("reservations/", "ReservationsController.store");
  Route.patch("reservations/:id", "ReservationsController.update");
  Route.delete("reservations/:id", "ReservationsController.destroy");
  /**
   * CustomersController
   */
  Route.get("customers", "CustomersController.index").as("customers");
  Route.get("customers/add", "CustomersController.add").as("addCustomer");
  Route.get("customers/:id?", "CustomersController.show");
  Route.post("customers/", "CustomersController.store");
  Route.patch("customers/:id", "CustomersController.update");
  Route.delete("customers/:id", "CustomersController.destroy");
}).middleware("auth");
