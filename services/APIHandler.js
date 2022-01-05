const axios = require('axios')

class APIHandler {

    getPlacePictures = placeName => axios.get(`https://imsea.herokuapp.com/api/1?q=${placeName}`)
  

}


module.exports = APIHandler