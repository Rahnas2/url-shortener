
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { TaskAlt, MailOutline, East, HighlightOff } from '@mui/icons-material';


const EmailVerification: React.FC = () => {

  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  const status = searchParams.get('status') || '';
  const email = searchParams.get('email') || '';

  const isSuccess = status === 'success';

  useEffect(() => {

    if (status === '') {
      navigate('/')
    }
    // Simulate loading to show animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login')
  }

  const handleRegisterRedirect = () => {
    navigate('/register')
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying your email...</h2>
          <p className="text-gray-600">Please wait while we confirm your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">

        {/* Success State */}
        {isSuccess && (
          <div className="text-center">
            <div className="mb-6">
              <TaskAlt className="w-20 h-20 text-green-500 mx-auto animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Verified Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Welcome to our URL shortener! Your account has been verified and you can now start creating and managing your shortened links.
            </p>
            {email && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-green-700">
                  <MailOutline className="w-4 h-4 inline mr-2" />
                  {email} has been verified
                </p>
              </div>
            )}
            <div className="space-y-3">
              <button
                onClick={handleLoginRedirect}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Sign In to Your Account
                <East className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isSuccess && (
          <div className="text-center">
            <div className="mb-6">
              <HighlightOff className="w-20 h-20 text-red-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email address. This might be because the verification link has expired or Invalid.
            </p>


            <div className="space-y-3">
              <button
                onClick={handleRegisterRedirect}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Back to Register
              </button>
            </div>
          </div>
        )}


        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;