const { Schema, model } = require("mongoose");
const pointSchema = new Schema({

    placeID: {
      type: Schema.Types.ObjectId, ref: 'Place'
    },
    
    name: String,
    comments: String, 
    tips: String,
    date: Date,
    imageUrl: String,

    location: {
      type: {
        type: String
    },
    coordinates: [Number]}

  },
  {

    timestamps: true,
  }
);

const Point = model("Point", pointSchema);

module.exports = Point;











