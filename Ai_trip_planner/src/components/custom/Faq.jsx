import React, { useState } from 'react';

const FAQ = () => {

    const faqs = [
    {
      question: "What is AI Travel Assistant?",
      answer: "AI Travel Assistant helps you plan your trips by providing personalized recommendations, travel itineraries, and other services powered by artificial intelligence."
    },
    {
      question: "How do I use the AI Travel Assistant?",
      answer: "You simply input your destination, preferences, and travel dates, and the AI assistant will generate a travel plan tailored to your needs."
    },
    {
      question: "Is this service free?",
      answer: "Yes, basic features are free, but premium services may require a subscription."
    },
    {
      question: "Can I book flights through the website?",
      answer: "Yes, we partner with major airlines to allow flight bookings directly through our platform."
    },
    {
      question: "How accurate are the recommendations?",
      answer: "Our AI algorithms continuously learn and improve based on user feedback and trends, so the recommendations get more accurate over time."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full  mx-auto px-[4rem] py-[4rem] text-gray-600">
      <h2 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div
              className="cursor-pointer flex justify-between items-center py-2 px-4 hover:bg-gray-100 rounded-md"
              onClick={() => handleToggle(index)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {openIndex === index && (
              <div className="text-gray-600 text-lg px-4 mt-2">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
