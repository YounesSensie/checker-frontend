"use client"
import React, { useState, useEffect } from 'react';
import { Hammer, Wrench, Clock } from 'lucide-react';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Animated Icons */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            <Hammer className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <Wrench className="w-16 h-16 text-indigo-600" strokeWidth={1.5} />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            <Clock className="w-16 h-16 text-purple-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          We&apos;re Building
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Something Amazing
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Our team is working hard to bring you an exceptional experience. 
          We&apos;ll be launching very soon!
        </p>

        {/* Countdown Timer */}
       

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full animate-pulse"
              style={{ width: '75%' }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">75% Complete</p>
        </div>

        {/* Call to Action */}
        <div className="text-gray-600">
          <p className="text-lg mb-4">Get ready to experience something extraordinary</p>
          <p className="text-sm text-gray-500">
            Check back soon to see what we&apos;ve been working on!
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
}