import { useState, useEffect } from 'react';
import { AuthService } from '../../services/authService';
import { Eye, Loader2, Shield } from "lucide-react";
import { useNotification } from '@/hooks/useNotification';

interface OtpVerificationProps {
  email: string;
  providedOtp?: string;
  onSuccess: () => void;
  mode?: 'email-verification' | 'password-reset';
  newPassword?: string;
}

// OTP Verification Component
export const OtpVerification = ({ 
  email, 
  providedOtp, 
  onSuccess, 
  mode = 'email-verification',
  newPassword 
}: OtpVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { success, error: notificationError } = useNotification();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  // If providedOtp exists, pre-fill the OTP field
  useEffect(() => {
    if (providedOtp) {
      setOtp(providedOtp);
    }
  }, [providedOtp]);

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setResendLoading(true);
    try {
      if (mode === 'password-reset') {
        await AuthService.forgotPassword(email);
      } else {
        await AuthService.resendOtp(email);
      }
      success('A new OTP has been sent to your email.');
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      notificationError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'password-reset') {
        // For password reset, we need email, OTP, and new password
        if (!newPassword) {
          throw new Error('New password is required for password reset');
        }
        await AuthService.resetPassword(email, otp, newPassword);
        success('Password reset successful!');
      } else {
        // For email verification
        await AuthService.verifyOtp(email, otp);
        success('OTP verified successfully!');
      }
      setLoading(false);
      onSuccess();
    } catch (err: any) {
      notificationError(err.response?.data?.message || 'OTP verification failed');
      setError(err.response?.data?.message || 'OTP verification failed');
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (providedOtp) {
      return 'Email verification code';
    }
    return mode === 'password-reset' 
      ? 'Enter the reset code sent to your email' 
      : 'Enter the OTP sent to your email';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
          <span className="text-gray-600 text-lg">
            {getTitle()}
          </span>
        </div>
        
        {providedOtp && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Email sending failed
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Your verification code is: <strong className="text-lg">{providedOtp}</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
          <div>
            <label htmlFor="otp" className="block text-base font-medium text-gray-700 mb-1">OTP Code</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
              mode === 'password-reset' ? "Reset Password" : "Verify OTP"
            )}
          </button>
          <div className="text-center text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || resendLoading}
              className="text-blue-500 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 