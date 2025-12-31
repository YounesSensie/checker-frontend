import React from 'react';
import { Eye, Wallet, Video, Heart, ShieldCheck } from 'lucide-react';

const FeaturesSection = () => {
  const contents = [
    {
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      title: "Local Human Eyes",
      description: "Real neighbors checking the reality, not the filter.",
    },
    {
      icon: <Wallet className="w-6 h-6 text-sky-500" />,
      title: "No Captive Prices",
      description: "Avoid agency markups and hidden booking fee traps.",
    },
    {
      icon: <Video className="w-6 h-6 text-indigo-600" />,
      title: "Filter-Free Proof",
      description: "Raw video and unedited photos of your exact stay.",
    },
    {
      icon: <Heart className="w-6 h-6 text-sky-500" />,
      title: "Soul-Needed Quality",
      description: "Skip the 'mediocre' and find authentic local gems.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "Pre-Booking Peace",
      description: "Confirm your safety before you spend a single dollar.",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="mb-10">
        <div className="inline-block mb-4">
          <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase bg-indigo-50 px-4 py-2 rounded-full">
            • • OUR FEATURES
          </span>
        </div>
        
        
        <h1 className="text-3xl font-bold text-gray-700 pt-1.5 leading-tight flex items-center gap-3">
          The 5 Sharp Features 
          <span className="inline-flex">
            <svg className="w-10 h-10 text-blue-400" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 2 L25 15 L35 15 L27 22 L30 35 L20 27 L10 35 L13 22 L5 15 L15 15 Z" />
            </svg>
            <svg className="w-6 h-6 text-blue-300 -ml-2 mt-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 Z" />
            </svg>
          </span>
        </h1>
      </div>

      {/* Features Grid */}
      <div className="space-y-8 p-1.5">
        {contents.map((item, index) => (
          <div key={index} className="flex gap-6 items-start">
            {/* Icon Container */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;