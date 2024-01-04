import React from 'react'

function Toolbar() {
  return (
    <div className="bg-gray-800 py-4 px-6 flex justify-between items-center">
    <div className="text-white text-lg font-bold">Toolbar</div>
    <div className="flex space-x-4">
        <button className="text-white hover:text-gray-300">Button 1</button>
        <button className="text-white hover:text-gray-300">Button 2</button>
        <button className="text-white hover:text-gray-300">Button 3</button>
    </div>
</div>
  )
}

export default Toolbar