// models/Feedback.js
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  comment: { type: String, required: true, trim: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now }
});

// If model exists (hot-reload), use it; otherwise create it.
export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
