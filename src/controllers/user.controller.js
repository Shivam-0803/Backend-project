import {asyncHandler} from "../utils/asynchHandler.js";
import {ApiError} from "../utils/ApiErrors.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/fileUpload.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async(req , res) => {


  
    //GET USER DETAILS FROM FRONTENED--------
    //VALIDATION -------NON EMPTY----
    //CHECK IF USERS ALREADY EXIST________ by uSERNAME AND EMAIL
    //CHECK FOR IMAGES CHECK FOR AVATAR----
    //UPLOAD THEM ON CLOUDINARY----------
    //CREATE USER OBJECT---- CREATE ENTRY IN DB
    //REMOVE PASSWORD AND REFRESH TOKEN FIELD
    //CHECK FOR USER CREATION
    //RETURN RES


    const {fullName ,email , username , password} = req.body
    console.log("email" , email)
    console.log("username" , username)

    //validationn------------

   if(
    [fullName , email , username , password].some((field) => field?.trim() === "")
   ){
        throw new ApiError(400 , "All fields are compulsory")

   }


   const existedUser = User.findOne({
    $or: [{ username } , { email }]
   })
   if(existedUser){
    throw new ApiError(409 , "User with email or username already exist")

   }


   //IMAGES CHECk---------

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath  = req.files?.coverImage[0]?.path;
   if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar file is req...")
   }
  
   //upload--------

   const avatar =await uploadOnCloudinary(avatarLocalPath)
   const coverImage =await uploadOnCloudinary(coverImageLocalPath)
   
   if(!avatar){
    throw new ApiError(400 , "Avatar file is req...")
   }





   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email ,
    password,
    username: username.toLowerCase()
   })
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(createdUser){
    throw new ApiError(500 , "Something went wrong while registering a user")

   }







   return res.status(201).json(
    new ApiResponse(200 , createdUser , "USER REGISTERED SUCCESSFULLY")
    
   )

     
})




export{
    registerUser,
}