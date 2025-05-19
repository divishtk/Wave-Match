import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 10 ,
      maxlenght:20
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min : 18 ,
    },
    gender: {
      type: String,
      // enum: ["Male", "Female", "Rather not to say"],
      validate(value) {
        console.log("called" ,value)
        if(!["Male" , "Female" , "Rather not to say"].includes(value)){
          throw new Error ("Gender data not valid ")
        }
      }
    },
    hobbies :{
      type: [String] ,
      default : []
    },
    mobileNo: {
      type: Number,
    },
    pic: {
      type: String,
      default :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
     // required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isMatchPassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
