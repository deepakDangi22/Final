import { Router, Response } from "express";
import { connectDB } from "../db/connection";
import { Booking } from "../db/models";

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

export default router;
