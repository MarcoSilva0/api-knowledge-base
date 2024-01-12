module.exports = (app) => {
  app.route("/users").post(app.api.user.save).get(app.api.user.get);

  app
    .route("/users/:id")
    .put(app.api.user.save)
    .get(app.api.user.getById)
    .delete(app.api.user.remove);

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(admin(app.api.category.get))
    .post(admin(app.api.category.save));

  // Cuidado com ordem! Tem que vir antes de /categories/:id
  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove));
};
