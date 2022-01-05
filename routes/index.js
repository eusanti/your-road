module.exports = app => {

  // Base routes

  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  const authRoutes = require("./auth.routes");
  app.use("/auth", authRoutes);

  const placeRoutes = require("./place.routes");
  app.use("/place", placeRoutes);

  const pointRoutes = require("./point.routes");
  app.use("/point", pointRoutes);

  const profileRoutes = require("./profile.routes");
  app.use("/profile", profileRoutes);

  const userRoutes = require("./user.routes");
  app.use("/", userRoutes);

}

//TO DO
