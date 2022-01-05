const router = require("express").Router()
const bcrypt = require('bcrypt')
const Place = require("../models/Place.model")
const Point = require("../models/Point.model")
const axios = require('axios');
const { isLoggedIn, checkRoles, isOwn } = require("../middlewares")
const APIHandler =  require("./../services/APIHandler")
const API = new APIHandler()



/// Ver colección 
router.get('/collections', isLoggedIn, (req, res) => {

const currentUserId= req.session.currentUser._id

  Place.find({isOwner: currentUserId})
    .then(allPlaces => {
      res.render('place/collections', { allPlaces })
    })
    .catch(err => console.log(err))
}),

//crear collections

router.post("/collections", (req, res) => {
  const {destination, description} = req.body 
  
  API
    .getPlacePictures(destination)
    .then(data => {
      const imagePlaceUrl =  data.data.results[0]
    
      Place.create({ destination, description, imagePlaceUrl, isOwner: req.session.currentUser._id })
     
        .then(newPlace => 
          res.redirect(`/place/marker/edit/${newPlace._id}`)
        
          )
        .catch(err => console.log(err))
    })

})


//// Editar:

router.get("/marker/edit/:place_id", (req, res) => {
  const id = req.params.place_id

  Place.findById(id)
    .then(thePlace => { 

      Point.find({ placeID: id })
      .then(thePoints => {
          
              res.render('place/travel-edit', {thePlace, thePoints}) 
      })
       .catch(err => console.log(err))
    
    })
    .catch(err => console.log(err))

})

router.post("/marker/edit/:place_id", isLoggedIn, (req, res) => {
  const id = req.params.place_id
  const { pointsInt } = req.body

  Point.create({name: pointsInt, placeID: id})
  
//Promise.all(promiseArr)
  .then(thePoints => {
    res.redirect(`/place/marker/edit/${id}`)
  })
  .catch(err => console.log(err))
    
  })

 
///mapa
router.get("/api", (req, res) => {
  Places.find()
  .then((allPlaces) => {
    res.status(200).json({places: allPlaces});
  })
  .catch((err) => console.log(err));
});


  //// Delete

    router.get("/marker/delete/:id", (req, res) =>{
        const { id } = req.params;
        Place.findByIdAndRemove(id)
        .then(() =>{res.redirect("/place/collections/")
        })
    });

module.exports = router;
