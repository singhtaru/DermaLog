const fs = require("fs"); //handling file operations
const dotenv = require("dotenv"); //Loads environment variables
const express = require("express"); // fro backend api
const cors = require("cors"); // frontend communication with backend
const bodyParser = require("body-parser"); // frontend communication with backend
const nodemailer = require("nodemailer"); //sending emails using smtp
const admin = require("firebase-admin"); //managing Firebase services programmatically
const cron = require("node-cron"); // scheduling emails
const axios = require("axios"); // HTTP client for making API requests



// ✅ Load environment variables
if (fs.existsSync(".env")) {
  dotenv.config();
} else {
  console.error(".env file is missing!");
  process.exit(1);
}

// ✅ Check required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.GEMINI_API_KEY) {
  console.error("Error: EMAIL_USER, EMAIL_PASS, and GEMINI_API_KEY must be set in .env");
  process.exit(1);
}


// ✅ Initialize Firebase
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountString) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
}

try {
  const serviceAccount = JSON.parse(serviceAccountString);

  // Initialize the app with the parsed credentials
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // other options...
  });
  console.log('Firebase Admin SDK initialized successfully!');
} catch (error) {
  console.error('Failed to parse Firebase service account key:', error);
  // It's good practice to exit the process if this fails, as the app is unusable
  process.exit(1); 
}

const db = admin.firestore(); 

// ✅ Express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Save reminders and schedule email at the selected time
app.post("/set-reminder", async (req, res) => {
  const { email, time } = req.body;
  if (!email || !time) {
    return res.status(400).json({ success: false, message: "Email and time are required" });
  }

  try {
    const docRef = await db.collection("reminders").add({
      email,
      time,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Reminder saved for ${email} at ${time}`);

    // ✅ Schedule the reminder dynamically
    scheduleReminder(email, time);

    res.json({ success: true, message: "Reminder saved and scheduled!" });
  } catch (error) {
    console.error("Error saving reminder:", error);
    res.status(500).json({ success: false, message: "Error saving reminder" });
  }
});

// ✅ Function to Send Email Reminders
const sendEmailReminder = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🌿 Skincare Routine Reminder 🧴",
    text: `Hope you're having a great day! 💖 This is your gentle reminder to take a few minutes for your skincare routine – because your skin deserves the best care! 🌿✨
            Here’s your quick self-care checklist:
            ✅ Cleanse away the stress of the day 🫧
            ✅ Apply your favorite moisturizer for that glow ✨
            ✅ Don’t forget sunscreen if you’re heading out! ☀️
            ✅ Hydrate – because great skin starts from within! 💧

            Consistency is key, and you’re doing amazing! Keep up the glow! 💕

            Stay radiant,
            Taru
            DermaLog Team 🌸`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", email, ":", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

// ✅ Function to Schedule a Reminder at a User-Specified Time
const scheduleReminder = (email, time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  // Schedule email at the specified time every day
  const cronTime = `${minute} ${hour} * * *`;

  cron.schedule(
    cronTime,
    () => {
      console.log(`⏰ Sending reminder to ${email} at ${time}`);
      sendEmailReminder(email);
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );

  console.log(`📅 Reminder scheduled for ${email} at ${time} daily.`);
};


app.post("/save-skin-condition", async (req, res) => {
  try {
    const { description, rating } = req.body;

    if (!description || !rating) {
      return res.status(400).json({ success: false, message: "Missing description or rating" });
    }

    // Save data to Firestore (assuming Firebase is set up)
    const docRef = await db.collection("skinConditions").add({
      description,
      rating,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true, message: "Skin condition saved!", id: docRef.id });
  } catch (error) {
    console.error("Error saving skin condition:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ✅ New Route: Get Skincare Advice Using Gemini API
app.post("/ai-assistant", async (req, res) => {
  try {
    const { concern } = req.body;
    if (!concern) {
      return res.status(400).json({ error: "Please provide a skin concern." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await axios.post(geminiApiUrl, {
      contents: [{ parts: [{ text: `Give a detailed skincare recommendation for: ${concern}. Format it properly with headings, bullet points, and spacing for better readability.` }] }]
    });

    console.log("Gemini API Response:", response.data);

    if (response.data && response.data.candidates) {
      const formattedResponse = response.data.candidates[0].content.parts[0].text;
      return res.json({ message: formattedResponse });
    } else {
      return res.status(500).json({ error: "Unexpected response from Gemini API" });
    }
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error.response?.data || error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});



// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

