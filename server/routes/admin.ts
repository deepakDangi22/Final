import { Router, Response } from "express";
import { connectDB } from "../db/connection";
import { Admin } from "../db/models";
import {
  hashPassword,
  comparePassword,
  generateToken,
  authMiddleware,
  AuthRequest,
} from "../utils/auth";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Multer configuration for admin image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads", "cars");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const uploadSingle = multer({ storage });
const uploadMultiple = multer({ storage });


// Upload single image (admin only)
router.post(
  "/upload",
  authMiddleware,
  uploadSingle.single("image"),
  (req: AuthRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Public URL path served from /uploads
    const relativePath = `/uploads/cars/${req.file.filename}`;

    return res.json({
      message: "File uploaded successfully",
      url: relativePath,
    });
  }
);

// Upload multiple images (admin only)
router.post(
  "/upload-multiple",
  authMiddleware,
  uploadMultiple.array("images", 10),
  (req: AuthRequest, res: Response) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const urls = (req.files as Express.Multer.File[]).map(
      (file) => `/uploads/cars/${file.filename}`
    );

    return res.json({
      message: "Files uploaded successfully",
      urls,
    });
  }
);

// Register Admin
router.post("/register", async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();

    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ error: "Username, email, and password are required" });
      return;
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      res
        .status(400)
        .json({ error: "Username or email already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    const token = generateToken(admin._id.toString(), username, email, "admin");

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req: AuthRequest, res: Response) => {
  try {
    console.log("Login request received");
    console.log("Request body:", req.body);

    await connectDB();
    console.log("Database connected");

    const { email, password } = req.body || {};
    console.log("Email:", email, "Password length:", password?.length);

    if (!email || !password) {
      console.log("Missing email or password");
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    console.log("Finding admin with email:", email);
    const admin = await Admin.findOne({ email });
    console.log("Admin found:", admin ? "Yes" : "No");

    if (!admin) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    console.log("Comparing passwords");
    const isPasswordValid = await comparePassword(password, admin.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    console.log("Generating token");
    const token = generateToken(
      admin._id.toString(),
      admin.username,
      admin.email,
      admin.role
    );
    console.log("Token generated");

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get current admin
router.get("/me", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({
    admin: req.admin,
  });
});

export default router;
