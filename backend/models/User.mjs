import mongoose from "mongoose";
import counterModel from "./counterModel.mjs";



const userSchema = new  mongoose.Schema({
    userId: {
        type: Number,
        unique: true
      },
    firstName : {
        type :  String,
        required : true,
    },
    lastName : {
        type : String, 
        required : true,
    },
    email : {
        type : String,
        unique : true,
    },
    role:{
      type: String,
      required : true,
    },
    password : {
        type :  String,
        required : true,
    },
    photo : {
        type : String,
        required : false,
    }

});
userSchema.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
      try {
        const counter = await counterModel.findByIdAndUpdate(
          { _id: 'userId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        doc.userId = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });

const User = mongoose.model('User', userSchema);

export default User;