import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true  // extra spaces hata dega
    },
    description: { 
      type: String, 
      required: false, // optional hai, chaho to true bhi kar sakte ho
      trim: true 
    },
    completed: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

const Todo =  mongoose.model("Todo", todoSchema);
export default Todo;