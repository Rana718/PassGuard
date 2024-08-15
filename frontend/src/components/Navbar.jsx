import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4 h-16">
        
        <motion.div className="logo font-bold text-white text-3xl flex items-center cursor-pointer" initial={{ rotate: 0 }} whileHover={{ rotate: [0, 15, -15, 0], transition: { duration: 0.6 } }}>
          <span className="text-green-500 text-4xl">&lt;</span>
          <motion.span className="text-green-300 tracking-wide" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}>
            Pass
          </motion.span>
          <motion.span className="text-green-500 tracking-wide" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}>
            Guard
          </motion.span>
          <span className="text-green-500 text-4xl">/&gt;</span>
        </motion.div>

        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <motion.button onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2 transition-transform duration-300 transform hover:scale-110 flex items-center" whileHover={{ scale: 1.1 }}>
              <img src="/icons/logout.png" alt="Sign Out" className="w-6 h-6 mr-2" />
              <span className="hidden md:inline">Sign Out</span>
            </motion.button>
          ) : (
            <>
              <Link to="/signin">
                <motion.div className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 transition-transform duration-300 transform hover:scale-110 flex items-center" whileHover={{ scale: 1.1 }}>
                  <img src="/icons/log-in.png" alt="Sign In" className="w-6 h-6 mr-2" />
                  <span className="hidden md:inline">Sign In</span>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 transition-transform duration-300 transform hover:scale-110 flex items-center"whileHover={{ scale: 1.1 }}>
                  <img src="/icons/user.png" alt="Sign Up" className="w-6 h-6 mr-2" />
                  <span className="hidden md:inline">Sign Up</span>
                </motion.div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
