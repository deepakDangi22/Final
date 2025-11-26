import { Router, Response } from "express";
import { connectDB } from "../db/connection";
import { Booking } from "../db/models";
import { authMiddleware, AuthRequest } from "../utils/auth";

const router = Router();

// Create a new booking (public)
router.post("/", async (req, res: Response) => {
  try {
    await connectDB();

    const {
      fullName,
      phone,
      pickupDate,
      returnDate,
      carSelected,
      pickupLocation,
      additionalNotes,
      carName,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !pickupDate ||
      !returnDate ||
      !carSelected ||
      !pickupLocation
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = await Booking.create({
      fullName,
      phone,
      pickupDate,
      returnDate,
      carSelected,
      pickupLocation,
      additionalNotes,
      carName,
    });

    return res.status(201).json({
      message: "Booking saved successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ error: "Failed to save booking" });
  }
});

// Get all bookings (admin only)
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;
