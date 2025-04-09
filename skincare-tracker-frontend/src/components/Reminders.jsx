import React, { useState } from "react";
import axios from "axios";

const Reminders = () => {
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSetReminder = async () => {
    if (!email || !time) {
      alert("Please enter your email and reminder time!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/set-reminder", { email, time });
      setMessage(response.data.message);

      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error setting reminder:", error);
      setMessage("Failed to set reminder.");

      // Hide error message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 m-4">
      <h1 className="text-lg font-semibold text-gray-800">Set Your Email Reminder!</h1>

      <input
        type="email"
        className="w-full p-2 mt-2 border rounded-lg"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="time"
        className="w-full p-2 mt-2 border rounded-lg"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        onClick={handleSetReminder}
        className="bg-orange-300 text-black px-4 py-2 mt-4 rounded-lg hover:bg-orange-400"
      >
        Save Reminder
      </button>

      {/* Message appears below the button and disappears after 3 seconds */}
      {message && <p className="text-green-600 mt-3">{message}</p>}
    </div>
  );
};

export default Reminders;
