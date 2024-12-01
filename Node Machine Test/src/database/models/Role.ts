import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
    required:true,
    trim: true,
  }
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
});

const Role = mongoose.model("roles", roleSchema);

export default Role;
