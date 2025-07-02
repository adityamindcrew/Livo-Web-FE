// Test MongoDB Connection
const mongoose = require("mongoose")
require("dotenv").config()

async function testConnection() {
  try {
    console.log("🔄 Connecting to MongoDB...")

    await mongoose.connect(process.env.MONGODB_URI)

    console.log("✅ Successfully connected to MongoDB Atlas!")
    console.log("📊 Database:", mongoose.connection.name)
    console.log("🌐 Host:", mongoose.connection.host)

    // Close the connection
    await mongoose.connection.close()
    console.log("🔒 Connection closed.")
  } catch (error) {
    console.error("❌ Connection failed:", error.message)
    process.exit(1)
  }
}

testConnection()
