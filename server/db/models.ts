import mongoose, { Schema, Document } from "mongoose";

// Car Model
export interface ICar extends Document {
  name: string;
  price: number;
  pricePerDay: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  transmission: string;
  fuelType: string;
  seats: number;
  luggage: string;
  mileage: string;
  engine: string;
  year: number;
  color: string;
  description: string;
  features: string[];
  amenities: string[];
  insurance: string;
  fuelPolicy: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const carSchema = new Schema<ICar>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
      },
    ],
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    luggage: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    insurance: {
      type: String,
      default: "Full Coverage Included",
    },
    fuelPolicy: {
      type: String,
      default: "Full Tank Required",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Admin Model
export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "superadmin";
  createdAt?: Date;
  updatedAt?: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export const Car =
  mongoose.models.Car || mongoose.model<ICar>("Car", carSchema);
export const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);


export interface IBooking extends Document {
  fullName: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  carSelected: string;
  pickupLocation: string;
  additionalNotes?: string;
  carName?: string;
}

const bookingSchema = new Schema<IBooking>(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pickupDate: { type: String, required: true },
    returnDate: { type: String, required: true },
    carSelected: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    additionalNotes: { type: String },
    carName: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Booking =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
