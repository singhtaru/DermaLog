
import React from "react";
import { Link } from "react-router-dom"; //allow navigation without reloading the page.

const Navbar = () => {// Functional Component   
  return (
    <nav className="bg-gradient-to-br from-[#877b61] via-[#ffce97] to-[#a2907b] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-20">
        <h1 className="text-3xl font-extrabold text-gray-800">DermaLog</h1>
        <ul className="flex space-x-4 text-xl font-medium ">
          <li><Link to="/" className="font-bold text-gray-700 hover:text-orange-800">Home</Link></li>
          <li><Link to="/routine" className="font-bold text-gray-700 hover:text-orange-800">Routine</Link></li>
          <li><Link to="/reminders" className="font-bold text-gray-700 hover:text-orange-800">Reminders</Link></li>
          <li><Link to="/tracker" className="font-bold text-gray-700 hover:text-orange-800">Track</Link></li>
          <li><Link to="/insights" className="font-bold text-gray-700 hover:text-orange-800">Insights</Link></li>
          <li><Link to="/assistant" className="font-bold text-gray-700 hover:text-orange-800">AI Assistant</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
