import React, { useState } from 'react';

function PopupR({ show, onClose, onExport }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [interests, setInterests] = useState([
    "Nanofibers",
    "Mifepristone",
    "Dapivirine",
    "Male Contraceptives",
    "Annovera",
    "Paragard",
    "Amitriptyline",
    "Vaginal Spermicides"
  ]);
  const [newInterest, setNewInterest] = useState("");

  const handleClose = () => {
    setShowDropdown(false); // Reset showDropdown to false
    onClose(); // Call the passed onClose function
  };

  if (!show) return null;

  const handleRangeSelect = (range) => {
    onExport(range);
    setShowDropdown(false); // Optionally hide the dropdown after selection
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests((prev) => prev.filter((interest) => interest !== interestToRemove));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    const trimmedInterest = newInterest.trim();
    if (!trimmedInterest) return;
    setInterests((prev) => [...prev, trimmedInterest]);
    setNewInterest("");
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={handleClose} className="absolute top-2 right-2">
          X
        </button>
        <div className="flex flex-col space-y-4">
          <div className="text-lg font-bold">Current interests</div>
          <div className="grid grid-cols-3 gap-2">
            {interests.map((interest, index) => (
              <div key={index} className="bg-gray-200 px-2 py-1 rounded flex items-center justify-between">
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="ml-1 text-red-500"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddInterest} className="flex space-x-2">
            <input
              type="text"
              placeholder="add another interest here"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupR;
