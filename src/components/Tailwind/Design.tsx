// import React from 'react'

// const Design = () => {

//     const mnemonics = 'reject ketchup chef team fatigue warm involve vendor gossip normal slice lab'.split(' ');

    
//   return (
//     <div>
//         <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
//   <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
//     {/* Title */}
//     <div className="text-center">
//       <h2 className="text-2xl font-semibold">Your Mnemonic Phrase</h2>
//       <p className="text-sm text-gray-500">Please store this safely!</p>
//     </div>

//     {/* Mnemonics Grid */}
//     <div className="grid grid-cols-3 gap-4">
//       {mnemonics.map((word, index) => (
//         <div
//           key={index}
//           className="bg-gray-100 border border-gray-300 text-center p-4 rounded-lg text-lg font-semibold"
//         >{word}
//         </div>
//       ))}
//     </div>

//     {/* Action Buttons */}
//     <div className="flex justify-center space-x-4">
//       <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">
//         Copy
//       </button>
//       <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg">
//         Download
//       </button>
//     </div>
//   </div>
// </div>

//     </div>
//   )
// }

// export default Design



// import React, { useState } from 'react';

// function Design() {
//   const [activeButton, setActiveButton] = useState(null); // State to track which button is active

//   const handleClick = (button: any) => {
//     setActiveButton(button); // Set the clicked button as active
//   };

//   return (
//     <div className="flex space-x-4">
//       <button
//         onClick={() => handleClick(1)}
//         className={`py-2 px-4 rounded-lg ${activeButton === 1 ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'}`}
//       >
//         Button 1
//       </button>
//       <button
//         onClick={() => handleClick(2)}
//         className={`py-2 px-4 rounded-lg ${activeButton === 2 ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black'}`}
//       >
//         Button 2
//       </button>
//     </div>
//   );
// }

// export default Design;
import React, { useEffect } from 'react';

const Design = () => {

  useEffect(() => {
    const APIKEY = import.meta.env.VITE_API_KEY;
    console.log(APIKEY);
  }, []);

  return (
    <div>Design</div>
  );
}

export default Design;
