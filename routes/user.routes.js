const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")
/* GET home page */



// router.get("/usuario/borrar/:id", checkRoles("ADMIN"), (req, res) => {
//   const { id } = req.params

//   User.findByIdAndDelete(id)
//     .then(() => res.redirect("/"))
//     .catch(err => console.log(err))

// })

module.exports = router;
