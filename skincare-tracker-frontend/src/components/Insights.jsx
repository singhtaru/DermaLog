import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// LineChart → Displays the line graph.
// Line → Represents the trend of skin condition ratings.
// XAxis → Represents the dates of entries.
// YAxis → Represents skin condition ratings.
// Tooltip → Displays details when hovering over points.
// CartesianGrid → Adds background grid lines.
// ResponsiveContainer → Ensures the chart adjusts to different screen sizes.


const Insights = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get stored skin condition data from localStorage
    const storedData = JSON.parse(localStorage.getItem("skinInsights")) || [];
    setData(storedData);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 m-4">
      <h2 className="text-lg font-semibold text-gray-800">Your Skin Insights</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[1, 10]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-600 mt-4">No data yet. Log your skin condition to see insights.</p>
      )}
    </div>
  );
};

export default Insights;
