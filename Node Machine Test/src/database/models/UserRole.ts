import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
  },
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },  
});

const UserRoles = mongoose.model("User-Roles", userRoleSchema);

export default UserRoles;
