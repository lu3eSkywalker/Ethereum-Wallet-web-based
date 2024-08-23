import React, { useState } from 'react';

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div id="accordion-collapse">
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <span>{`Accordion Item ${index}`}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'} shrink-0`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${index}`}
              className={`transition-all ${openIndex === index ? 'block' : 'hidden'}`}
              aria-labelledby={`accordion-collapse-heading-${index}`}
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  {`Content for Accordion Item ${index}`}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {`Details for Accordion Item ${index}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordian;
