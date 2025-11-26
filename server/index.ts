import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import adminRoutes from "./routes/admin";
import carRoutes from "./routes/cars";
import bookingsRoutes from "./routes/bookings";
import newsletterRoutes from "./routes/newsletter";
import path from "path";
import fs from "fs";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static uploads folder
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsDir));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin routes
  app.use("/api/admin", adminRoutes);

  // Car routes
  app.use("/api/cars", carRoutes);

  // Booking routes
  app.use("/api/bookings", bookingsRoutes);

  // Newsletter routes
  app.use("/api/newsletter", newsletterRoutes);

  return app;
}
