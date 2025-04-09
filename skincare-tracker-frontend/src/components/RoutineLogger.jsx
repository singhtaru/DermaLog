import React, { useState, useEffect } from "react";
// useState-> Manages form inputs, messages, and stored routines.
// useEffect → Retrieves saved routines from localStorage when the component loads.
const RoutineLogger = () => {
  const [routine, setRoutine] = useState("");
  const [customProduct, setCustomProduct] = useState("");
  const [note, setNote] = useState("");
  const [savedRoutines, setSavedRoutines] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Predefined product options (User can also enter custom)
  const productOptions = ["Cleanser", "Moisturizer", "Sunscreen", "Serum", "Toner", "Exfoliant"];

  useEffect(() => {
    // ✅ Ensure localStorage is accessed safely
    const storedData = JSON.parse(localStorage.getItem("routineLogs")) || [];
    setSavedRoutines(storedData);
  }, []);

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const handleSave = () => {
    if (!routine && !customProduct) {
      setMessage("⚠️ Please select or enter a product.");
      return;
    }

    const today = getCurrentDate();
    const productUsed = customProduct ? customProduct : routine;
    let updatedRoutines = [...savedRoutines];

    if (editingId) {
      // ✅ Updating existing routine entry
      updatedRoutines = updatedRoutines.map(entry => ({
        ...entry,
        entries: entry.entries.map(r =>
          r.id === editingId ? { ...r, routine: productUsed, note } : r
        ),
      }));
      setEditingId(null);
    } else {
      // ✅ Check if today's date exists
      const existingEntryIndex = updatedRoutines.findIndex(entry => entry.date === today);
      if (existingEntryIndex !== -1) {
        updatedRoutines[existingEntryIndex].entries.push({
          id: Date.now(),
          routine: productUsed,
          note,
        });
      } else {
        updatedRoutines.push({
          date: today,
          entries: [
            {
              id: Date.now(),
              routine: productUsed,
              note,
            },
          ],
        });
      }
    }

    setSavedRoutines(updatedRoutines);
    localStorage.setItem("routineLogs", JSON.stringify(updatedRoutines));

    // ✅ UI Feedback
    setRoutine("");
    setCustomProduct("");
    setNote("");
    setMessage("✅ Routine saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (routine) => {
    setRoutine(routine.routine);
    setNote(routine.note || "");
    setEditingId(routine.id);
  };

  const handleDelete = (id) => {
    let updatedRoutines = savedRoutines
      .map(entry => ({
        ...entry,
        entries: entry.entries.filter(routine => routine.id !== id),
      }))
      .filter(entry => entry.entries.length > 0);

    setSavedRoutines(updatedRoutines);
    localStorage.setItem("routineLogs", JSON.stringify(updatedRoutines));
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 m-4">
      <h2 className="text-xl font-bold text-[#6b4f4b]">Log Your Routine</h2>

      {/* Select product used */}
      <select
        className="w-full p-2 mt-2 border rounded-lg"
        value={routine}
        onChange={(e) => setRoutine(e.target.value)}
      >
        <option value="">Select a product</option>
        {productOptions.map((product, index) => (
          <option key={index} value={product}>
            {product}
          </option>
        ))}
      </select>

      {/* Custom product input */}
      <input
        type="text"
        className="w-full p-2 mt-2 border rounded-lg"
        placeholder="Or enter a custom product..."
        value={customProduct}
        onChange={(e) => setCustomProduct(e.target.value)}
      />

      {/* Optional notes */}
      <textarea
        className="w-full p-2 mt-2 border rounded-lg"
        placeholder="Add optional notes (e.g., how your skin felt)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      {/* Save button */}
      <button
        onClick={handleSave}
        className={`px-4 py-2 mt-4 rounded-lg text-black ${
          editingId ? "bg-green-500 hover:bg-green-600" : "bg-orange-400 hover:bg-orange-300"
        }`}
      >
        {editingId ? "Update Routine" : "Save Routine"}
      </button>

      {/* ✅ Success Message Below Button */}
      {message && <p className="mt-2 text-green-600">{message}</p>}

      {/* Display saved routines */}
      {savedRoutines.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-[#6b4f4b]">Saved Routines</h3>
          <ul className="mt-2 space-y-4">
            {savedRoutines.map((entry) => (
              <li key={entry.date} className="bg-[#f7d9c4] p-3 rounded-lg">
                <p className="font-bold">{entry.date}</p>
                <ul className="mt-2 space-y-2">
                  {entry.entries.map((routine) => (
                    <li key={routine.id} className="flex justify-between items-center bg-white p-2 rounded-md shadow">
                      <div>
                        <p className="font-medium">{routine.routine}</p>
                        {routine.note && <p className="text-xs italic text-gray-500">Note: {routine.note}</p>}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(routine)}
                          className="bg-orange-400 text-black px-2 py-1 rounded-md hover:bg-orange-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(routine.id)}
                          className="bg-orange-600 text-black px-2 py-1 rounded-md hover:bg-orange-100"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoutineLogger;
