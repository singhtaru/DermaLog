import React, { useState } from "react";
import axios from "axios";

const AIAssistant = () => {
  const [concern, setConcern] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/ai-assistant", { concern });
      setResponse(res.data.message);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error getting AI recommendation. Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">✨ AI Skincare Assistant ✨</h2>

        <textarea
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          placeholder="Describe your skin concern..."
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-orange-400 hover:bg-orange-200 text-black font-semibold py-2 rounded-lg transition duration-200"
        >
          Get Advice
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner max-h-60 overflow-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">📝 AI Recommendation:</h3>
            <div
              className="text-gray-700 text-md leading-relaxed"
              dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, "<br/>") }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
