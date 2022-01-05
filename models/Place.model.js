const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
    destination: String, // Api buscador place
    description: String, // Api descripción
    imagePlaceUrl: String, //Api imasea
    isOwner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    
    location: {
      type: {
        type: String
    },
    coordinates: [Number]} // Este apunto al centro del place - lugar de destino
  },
  {
//valida los cambios realizados
    timestamps: true,
  }
);

placeSchema.index({ location: '2dsphere' });

const Place = model("Place", placeSchema);
module.exports = Place;
///// Modelo del lugar genérico dónde vamos a ir (SEVILLA)