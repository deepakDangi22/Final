import "dotenv/config";
import { connectDB, disconnectDB } from "./db/connection";
import { Car, Admin } from "./db/models";
import { hashPassword } from "./utils/auth";

const seedCars = [
  {
    name: "BMW 5 Series",
    price: 8000,
    pricePerDay: 150,
    rating: 4.8,
    reviews: 125,
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop&q=80",
    ],
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    luggage: "500 L",
    mileage: "15 km/l",
    engine: "2.0L Turbocharged",
    year: 2023,
    color: "Black Pearl",
    description:
      "Experience luxury and performance with the BMW 5 Series. A perfect blend of elegance, comfort, and cutting-edge technology. Ideal for business trips and special occasions.",
    features: [
      "Premium Leather Interior",
      "Panoramic Sunroof",
      "Navigation System",
      "Climate Control",
      "Bluetooth Connectivity",
      "Power Windows & Locks",
      "Cruise Control",
      "Automatic Transmission",
      "Airbags",
      "ABS Braking System",
    ],
    amenities: [
      "Complimentary Wi-Fi Hotspot",
      "Phone Charging Port",
      "Premium Sound System",
      "Heated Seats",
      "Power Steering",
      "Adjustable Seats",
    ],
    insurance: "Full Coverage Included",
    fuelPolicy: "Full Tank Required",
    available: true,
  },
  {
    name: "Fortuner 4×4",
    price: 5000,
    pricePerDay: 100,
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1617654112368-307921291f50?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617654112368-307921291f50?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609708536965-d4f46f20dc35?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1533473359331-35acda7ce3aa?w=800&h=600&fit=crop&q=80",
    ],
    transmission: "Manual",
    fuelType: "Diesel",
    seats: 7,
    luggage: "800 L",
    mileage: "12 km/l",
    engine: "2.8L Diesel",
    year: 2023,
    color: "Silver",
    description:
      "The Fortuner 4×4 is a powerful SUV perfect for adventurers and families. With excellent ground clearance and off-road capabilities, it's ideal for long road trips and challenging terrains.",
    features: [
      "All-Wheel Drive",
      "Roof Rails",
      "Touchscreen Infotainment",
      "Reverse Camera",
      "Parking Sensors",
      "Power Windows",
      "Air Conditioning",
      "ABS & Stability Control",
      "Multiple Airbags",
      "Traction Control",
    ],
    amenities: [
      "Third Row Seating",
      "USB Ports",
      "Roof Mounted Rails",
      "Fog Lights",
      "Running Boards",
      "All Weather Mats",
    ],
    insurance: "Full Coverage Included",
    fuelPolicy: "Full Tank Required",
    available: true,
  },
  {
    name: "Swift Dzire",
    price: 1500,
    pricePerDay: 50,
    rating: 4.5,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609708536965-d4f46f20dc35?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop&q=80",
    ],
    transmission: "Manual",
    fuelType: "Petrol",
    seats: 5,
    luggage: "268 L",
    mileage: "20 km/l",
    engine: "1.2L Petrol",
    year: 2023,
    color: "Red",
    description:
      "The Swift Dzire is an economical and reliable sedan perfect for city driving and daily commutes. Known for excellent fuel efficiency and easy maneuverability in tight spaces.",
    features: [
      "Power Steering",
      "Electric Windows",
      "Air Conditioning",
      "Power Locks",
      "Adjustable Seats",
      "Immobilizer",
      "Dual Airbags",
      "ABS Braking",
      "EBD Technology",
      "Central Locking",
    ],
    amenities: [
      "Fuel Efficient Engine",
      "Compact Design",
      "Easy Parking",
      "Touchscreen Display",
      "Bluetooth Support",
      "USB Charging",
    ],
    insurance: "Full Coverage Included",
    fuelPolicy: "Full Tank Required",
    available: true,
  },
  {
    name: "Audi A6",
    price: 9000,
    pricePerDay: 180,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609708536965-d4f46f20dc35?w=800&h=600&fit=crop&q=80",
    ],
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    luggage: "530 L",
    mileage: "14 km/l",
    engine: "2.0L TFSI",
    year: 2024,
    color: "Pearl White",
    description:
      "The Audi A6 represents the pinnacle of German engineering and sophistication. With state-of-the-art technology and luxurious comfort, it's perfect for those who demand excellence.",
    features: [
      "Quattro All-Wheel Drive",
      "Matrix LED Headlights",
      "Panoramic Glass Roof",
      "Leather Interior",
      "Premium Sound System",
      "Navigation Plus",
      "Adaptive Air Suspension",
      "Virtual Cockpit",
      "Wireless Charging",
      "Advanced Safety Systems",
    ],
    amenities: [
      "Head-Up Display",
      "Ambient Lighting",
      "Memory Seats",
      "Phone Integration",
      "Voice Control",
      "Power Tailgate",
    ],
    insurance: "Full Coverage Included",
    fuelPolicy: "Full Tank Required",
    available: true,
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await Car.deleteMany({});
    console.log("Cleared existing cars");

    // Seed cars
    const savedCars = await Car.insertMany(seedCars);
    console.log(`✅ Seeded ${savedCars.length} cars`);

    // Create default admin if doesn't exist
    const existingAdmin = await Admin.findOne({ email: "admin@rajcarrenter.com" });
    if (!existingAdmin) {
      const hashedPassword = await hashPassword("admin123");
      const admin = new Admin({
        username: "admin",
        email: "admin@rajcarrenter.com",
        password: hashedPassword,
        role: "superadmin",
      });
      await admin.save();
      console.log("✅ Created default admin account");
      console.log("   Email: admin@rajcarrenter.com");
      console.log("   Password: admin123");
    }

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seed();
