import React, { useState, useEffect } from "react";
// useState-> Manages form inputs, messages, and stored routines.
// useEffect → Retrieves saved routines from localStorage when the component loads.
const SkinTracker = () => {
  const [conditionDescription, setConditionDescription] = useState("");
  const [conditionRating, setConditionRating] = useState("");
  const [message, setMessage] = useState("");
  const [pastConditions, setPastConditions] = useState([]);
  const [trendMessage, setTrendMessage] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("skinInsights")) || [];
    setPastConditions(storedData);
    analyzeTrend(storedData);
  }, []);

  const analyzeTrend = (entries) => {
    if (entries.length < 2) {
      setTrendMessage("Not enough data to analyze trends.");
      return;
    }

    const latest = entries[entries.length - 1];
    const previous = entries[entries.length - 2];

    if (latest.rating > previous.rating) {
      setTrendMessage("🔼 Your skin condition is improving!");
    } else if (latest.rating < previous.rating) {
      setTrendMessage("🔻 Your skin condition has worsened. Stay consistent with your routine.");
    } else {
      setTrendMessage("➡ No significant change in skin condition.");
    }
  };

  const handleSave = async () => {
    if (!conditionDescription || !conditionRating) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }
  
    const skinEntry = {
      description: conditionDescription,
      rating: parseInt(conditionRating), // Convert to number for consistency
    };
  
    try {
      //  Send Data to Firestore via Backend
      const response = await fetch("http://localhost:5000/save-skin-condition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skinEntry),
      });
  
      const result = await response.json();
      
      if (result.success) {
        setMessage("✅ Skin condition saved!");
        const updatedData = [...pastConditions, { date: new Date().toLocaleDateString(), ...skinEntry }];
        localStorage.setItem("skinInsights", JSON.stringify(updatedData)); // Store in localStorage for UI updates
        setPastConditions(updatedData);
        analyzeTrend(updatedData);
        setConditionDescription("");
        setConditionRating("");
      } else {
        setMessage("❌ Failed to save. Try again.");
      }
    } catch (error) {
      console.error("Error saving skin condition:", error);
      setMessage("❌ Server error. Please try again.");
    }
  
    setTimeout(() => setMessage(""), 3000);
  };
  
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 m-4">
      <h1 className="text-lg font-semibold text-gray-800">Track Your Skin Condition ⏱</h1>

      <input
        type="text"
        className="w-full p-2 mt-2 border rounded-lg"
        placeholder="Describe your skin condition..."
        value={conditionDescription}
        onChange={(e) => setConditionDescription(e.target.value)}
      />

      <input
        type="number"
        className="w-full p-2 mt-2 border rounded-lg"
        placeholder="Rate your skin condition (1-10)"
        min="1"
        max="10"
        value={conditionRating}
        onChange={(e) => setConditionRating(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-orange-500 text-black px-4 py-2 mt-4 rounded-lg hover:bg-orange-100 transition duration-200"
      >
        Save Entry
      </button>

      {message && (
        <p className={`mt-2 text-sm font-medium ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      {/* Trend Analysis Message */}
      {trendMessage && (
        <p className="mt-4 text-sm font-medium text-blue-600">{trendMessage}</p>
      )}

      {/* Display Past Conditions */}
      {pastConditions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-700">Past Skin Condition Entries</h3>
          <ul className="mt-2 space-y-2">
            {pastConditions.map((entry, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-bold">{entry.date}</p>
                <p>{entry.description}</p>
                <p className="text-sm">Rating: {entry.rating}/10</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkinTracker;
