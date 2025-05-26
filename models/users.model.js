import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator'
import jwt from "jsonwebtoken" 

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
      validate(value) {
        if (!validator.isEmail(value)){
            throw new Error(`Invalid email ${value}`);
            
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)){
            throw new Error(`Enter strong password!`);
            
        }
      }
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
      default :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ,
     // required: true,
     validate(value) {
      if (!validator.isURL(value)){
          throw new Error(`Invalid Url`);
          
      }
    }
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


UserSchema.methods.getJWT = function (){
  const user = this ;
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
  return token ;
}


export const User = mongoose.model("User", UserSchema);
