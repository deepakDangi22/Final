import { Router, Response } from "express";
import { connectDB } from "../db/connection";
import { Car } from "../db/models";
import { authMiddleware, AuthRequest } from "../utils/auth";

const router = Router();

// Get all cars (public)
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// Get single car by ID (public)
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

// Create car (admin only)
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();

    const car = new Car(req.body);
    await car.save();

    res.status(201).json({
      message: "Car created successfully",
      car,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Failed to create car" });
  }
});

// Update car (admin only)
router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();

    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({
      message: "Car updated successfully",
      car,
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "Failed to update car" });
  }
});

// Delete car (admin only)
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      await connectDB();

      const car = await Car.findByIdAndDelete(req.params.id);

      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }

      res.json({
        message: "Car deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting car:", error);
      res.status(500).json({ error: "Failed to delete car" });
    }
  }
);

export default router;
