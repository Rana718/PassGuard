import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col items-center justify-center p-6 overflow-hidden">
      <header className="bg-gradient-to-r from-blue-700 to-purple-800 text-white text-center py-16 w-full rounded-b-3xl shadow-2xl relative overflow-hidden">
        <h1 className="text-5xl font-extrabold mb-4 relative">
          <span className="block animate-pulse text-blue-200">Welcome to</span>
          <span className="block text-6xl font-extrabold mt-2 relative">
            <Typewriter 
              options={{ 
                strings: ['PassGuard 🚀'], 
                autoStart: true,
                loop: true,
                cursor: '_',
                delay: 75
              }}
            />
          </span>
        </h1>
        <p className="text-xl mb-6 max-w-lg mx-auto px-4 text-gray-100">
          Your secure password manager for modern web security.
        </p>
        <p className="text-md mb-8 px-4 max-w-lg mx-auto text-gray-200">
          🛡️ Store all your passwords securely in one place. Our website uses state-of-the-art encryption to ensure your data remains safe and inaccessible to unauthorized users. With PassGrad, your passwords are safeguarded against breaches and unauthorized access.
        </p>
        <div className="mt-6 space-x-4 flex flex-wrap justify-center">
          <button 
            onClick={handleSignInClick}
            className="bg-white text-blue-800 px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105 mb-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUpClick}
            className="bg-white text-blue-800 px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105 mb-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            Sign Up
          </button>
        </div>
      </header>
      <section className="mt-12 text-center px-4">
        <h2 className="text-2xl font-semibold mb-4 animate-fade-in text-purple-800">
          Trusted by Industry Leaders 🌟
        </h2>
        <p className="text-md mb-4 max-w-lg mx-auto text-gray-700 leading-relaxed">
          “PassGrad is recognized for its innovative approach to password management. Industry leaders such as Google CEO Sundar Pichai, Tesla’s Elon Musk, Oracle’s Safra Catz, and Microsoft’s Satya Nadella have endorsed our commitment to security and user privacy. Our advanced encryption technology ensures that your sensitive information remains protected against any potential breaches.”
        </p>
        <div className="mt-6 p-6 bg-blue-50 border-t-4 border-blue-800 rounded-lg shadow-lg animate-slide-up">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">What Users Are Saying:</h3>
          <p className="text-sm text-gray-600">
            "PassGrad has revolutionized the way we manage passwords with its ease of use and unmatched security." - Jane Doe
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
