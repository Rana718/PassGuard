import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const { setIsAuthenticated, API } = useAuth();
    const navigate = useNavigate();
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),

        });
        setShowPopup(true); 

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
            
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/signin'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="container mx-auto p-6">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-white">Sign Up</h2>
                
                <form onSubmit={handleSignUp} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl ring-1 ring-gray-900/5 transition-transform transform hover:scale-105">
                    <div className="mb-6">
                        <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="username">Username</label>

                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                            className="shadow-lg border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                            placeholder="Enter your username" required
                        />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="email">Email</label>

                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="shadow-lg border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                            placeholder="Enter your email" required
                        />

                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-800 text-lg font-semibold mb-2" htmlFor="password">Password</label>

                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="shadow-lg border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                            placeholder="Enter your password" required
                        />

                    </div>
                    <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4 text-white">
                    Already have an account? <a href="/signin" className="text-blue-300 hover:text-blue-500 font-semibold">Sign In</a>
                </p>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50 transition-opacity duration-500 ease-in-out">
                        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-auto text-center transform transition-transform duration-500 ease-in-out scale-100">
                            <h3 className="text-2xl font-extrabold mb-4 text-blue-600">Success!</h3>
                            <p className="mb-6 text-lg text-gray-700">Your account has been created successfully.</p>
                            <button onClick={handleClosePopup} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
