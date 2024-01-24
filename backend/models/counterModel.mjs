import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const counterModel = mongoose.model('Counter', counterSchema);

export default counterModel;


