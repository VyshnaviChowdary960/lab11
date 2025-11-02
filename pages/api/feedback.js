// pages/api/feedback.js
import dbConnect from "../../lib/mongoose";
import Feedback from "../../models/Feedback";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(100);
      res.status(200).json({ success: true, data: feedbacks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else if (method === "POST") {
    try {
      const { name, comment } = req.body;
      // Basic server-side validation
      if (!name || !comment) {
        return res.status(400).json({ success: false, error: "Name and comment required" });
      }
      const newFeedback = await Feedback.create({ name, comment });
      res.status(201).json({ success: true, data: newFeedback });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
