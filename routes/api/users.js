const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const db = require("../../models");


// Matches with "/api/users"
router.route("/")
  .get(function(req, res){
    usersController.findAll(req, res);
  })
  .post(function(req, res){
    usersController.create(req, res);
  });

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
