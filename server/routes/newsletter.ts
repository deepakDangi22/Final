import { Router, Response, Request } from "express";
import { connectDB } from "../db/connection";
import { Newsletter } from "../db/models";

const router = Router();

// Subscribe to newsletter
router.post("/subscribe", async (req: Request, res: Response) => {
  try {
    await connectDB();

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({
      email,
      subscribedAt: new Date(),
    });

    return res.status(201).json({
      message: "Successfully subscribed to newsletter",
      subscriber,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return res.status(500).json({ error: "Failed to subscribe to newsletter" });
  }
});

// Get all subscribers (admin only - for future use)
router.get("/subscribers", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

export default router;
