const express = require("express");
const { VolunteersService } = require("../services/VolunteersService");

function volunteersRouter(expressApp) {
  const router = new express.Router();
  expressApp.use("/api/volunteers", router);
  const volunteersService = new VolunteersService();
  router.get("/", async (req, res, next) => {
    try {
      const volunteersList = await volunteersService.findVolunteers({});
      res.status(200);
      res.send({
        data: volunteersList,
        message: "Consult of volunteers was successful",
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = volunteersRouter;
