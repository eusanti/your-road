const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true, //-> Ideally, should be unique, but its up to you
      required  : [ true, 'El correo es necesario' ], 
    },
    password: String,
    role: {
    type: String,
    enum: ['TRAVELLER', 'GUEST', 'ADMIN'],
    default: 'TRAVELLER',
    required: true,
    },
    username: String,
    imageUrl: String,
    from: String,
    description: String,
 
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;