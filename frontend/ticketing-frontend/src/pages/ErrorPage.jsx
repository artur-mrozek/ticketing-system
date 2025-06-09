import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-24 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <div className="flex justify-center mb-4 text-red-600">
                    <FaExclamationTriangle size={48} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Something went wrong</h1>
                <p className="text-lg text-gray-600 mb-6">
                    We couldn’t find the page you were looking for.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <FaHome />
                        Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;
