import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Eye } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useNotification } from '@/hooks/useNotification';
import { OtpVerification } from './OtpVerification';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { error: notificationError } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notificationError('Invalid email address.');
      setError('Invalid email address.');
      return false;
    }

    if (password.length < 6) {
      notificationError('Password must be at least 6 characters long.');
      setError('Password must be at least 6 characters long.');
      return false;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    if (!hasLetter || !hasSymbol) {
      notificationError('Password must contain at least one letter and one symbol.');
      setError('Password must contain at least one letter and one symbol.');
      return false;
    }

    setError('');
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      await login(email, password);
      setLoading(false);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.response?.data?.error === 'Please verify your email before logging in.') {
        // User exists but email is not verified - show OTP screen
        setShowOtp(true);
        setError(''); // Clear any previous errors
      } else {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to login';
        notificationError(errorMessage);
        setError(errorMessage);
      }
      setLoading(false);
    }
  };

  const handleOtpSuccess = async () => {
    // After successful OTP verification, try to login again
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to login';
      notificationError(errorMessage);
      setError(errorMessage);
      setShowOtp(false); // Go back to login form if login still fails
    }
  };

  if (showOtp) {
    return <OtpVerification email={email} onSuccess={handleOtpSuccess} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
          <span className="text-gray-600 text-lg">Welcome back! Please login to your account</span>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5"
            >
              <Eye className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="text-right">
            <a 
              href="/forgot-password" 
              className="text-sm text-blue-500 hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#42a5ea] hover:bg-[#2196f3] text-white font-semibold py-3 rounded-md transition text-base"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full border text-white border-gray-300 text-gray-700 font-semibold py-3 rounded-md transition text-base"
          >
            Back to Home
          </button>
          <div className="text-center text-base text-gray-600 pt-2">
            Don't have an account?{' '}
            <a href='/register' type="button" className="text-blue-500 hover:underline font-medium">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
