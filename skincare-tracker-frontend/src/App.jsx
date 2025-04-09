
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutineLogger from "./components/RoutineLogger";
import Reminders from "./components/Reminders";
import SkinTracker from "./components/SkinTracker";
import Insights from "./components/Insights";
import AiAssistant from "./components/AiAssistant";
const Home = () => (
  <div className="text-center py-12 px-6">
    <h2 className="text-gray-700 text-4xl font-extrabold">Welcome to DermaLog</h2>
    
    <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mt-8">
      {/* Text Section */}
      <div className="text-left space-y-5">
        <p className="text-gray-600 text-lg leading-relaxed">
          Skincare can feel overwhelming with countless products, complex routines, and the challenge of staying consistent.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          With <span className="font-bold text-orange-500">DermaLog</span>, we aim to simplify skincare tracking and empower users to:
        </p>
        <ul className="list-none text-gray-700 pl-5 space-y-2">
          <li>✅ Log and manage daily skincare routines effortlessly</li>
          <li>✅ Stay consistent with reminders for morning and night routines</li>
          <li>✅ Gain insights into skincare effectiveness with personalized trends</li>
          <li>✅ Learn about ingredients and their impact on skin health</li>
        </ul>
        <p className="text-gray-700 text-lg font-semibold">
          Prioritize your skin’s well-being—because healthy skin starts with consistency and care. 💙💜💖
        </p>
      </div>

      {/* Image Section */}
      <div className="flex flex-col gap-6">
        <img src="src/assets/flat-lay-arrangement-argan-oil-care-product.jpg" className="w-full h-60 object-cover rounded-lg shadow-md" alt="Skincare products"/>
        <img src="src/assets/skincare_products_1.jpg" className="w-full h-60 object-cover rounded-lg shadow-md" alt="More skincare products"/>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="bg-amber-50">
    <Router>
      <Navbar />
      <div className="container mx-auto p-4 h-screen w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routine" element={<RoutineLogger />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/tracker" element={<SkinTracker />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/assistant" element={<AiAssistant />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;
