import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { useNotification } from '@/hooks/useNotification';
import { ResetPassword } from './ResetPassword';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [providedOtp, setProvidedOtp] = useState<string>('');
  const { success, error: notificationError } = useNotification();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notificationError('Invalid email address.');
      setError('Invalid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail()) {
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.forgotPassword(email);
      setLoading(false);
      
      // Check if email was sent successfully
      if (response.data.emailSent) {
        success('If the email exists, a reset code has been sent.');
      } else {
        // Email failed, show OTP to user
        setProvidedOtp(response.data.otp);
        success('Password reset initiated. Email sending failed. Please use the OTP provided below.');
      }
      
      setShowResetPassword(true);
    } catch (err: any) {
      notificationError(err.response?.data?.message || 'Failed to process forgot password request');
      setError(err.response?.data?.message || 'Failed to process forgot password request');
      setLoading(false);
    }
  };

  if (showResetPassword) {
    return <ResetPassword email={email} providedOtp={providedOtp} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
          <span className="text-gray-600 text-lg">Reset your password</span>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
            />
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
              "Send Reset Code"
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-md transition text-base flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-500 hover:underline font-medium">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}; 