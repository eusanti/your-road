const router = require("express").Router()
const User = require("../models/User.model")
const Place = require("../models/Place.model")
const { isLoggedIn, checkRoles, isOwn } = require("../middlewares")
const fileUploader = require("../config/cloudinary.config");

router.get('/:id', isLoggedIn, (req, res) => {

  const id = req.params.id
  const currentUserId = req.session.currentUser._id

Place.find({isOwner: currentUserId})
    .then(allPlaces => {
        User.findById()
        .then(userInfo => 
          res.render('profile/profile-edit', {allPlaces, userInfo})
        )
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

});
router.post("/:id", fileUploader.single('imageUrl'), (req, res) => {
  const {id} = req.params
  const { username, from, description} = req.body;


  User.findByIdAndUpdate(id, 
    { username, from, description, imageUrl: req.file?.path },  { new: true })

  .then(userEdit => {
      console.log(userEdit)
      res.redirect(`/profile/${id}/details`)
    })
    .catch(error => console.log(`Error while creating details of points: ${error}`));
  })

  router.get('/:id/details', isLoggedIn, (req, res) => {

  const id = req.params.id
  const currentUserId = req.session.currentUser._id

  Place.find({isOwner: currentUserId})
    .then(allPlaces => {
        User.findById(id)
        .then(userInfo => 
          res.render('profile/profile-details', {allPlaces, userInfo})
        )
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  
}),

  //// Delete


    router.get("/details/delete/:id", (req, res) =>{
        const { id } = req.params;
        Point.findByIdAndRemove(id)
        .then(() =>{res.redirect("/")
        })
    });

module.exports = router;
