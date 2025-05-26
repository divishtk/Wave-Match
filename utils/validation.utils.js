import validator from 'validator'

export const validateSignUpData = async(req , res , next) =>{

    const { firstName, lastName, email, password, gender } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid") ;
    }

     if(!validator.isEmail(email)){
        throw new Error("Email is not valid") ;
    }
     if(!validator.isStrongPassword(password)){
        throw new Error("Enter string password ") ;
    }

    return req.body ; 

}


export const validateEditProfileData = (req , res , next) =>{
    const allowedEditFields = ["firstName","lastName","pic","hobbies","gender","about","age"] ;
    const isEditAllowed = Object.keys(req.body).every(k=>allowedEditFields.includes(k)) ;

    return isEditAllowed

}