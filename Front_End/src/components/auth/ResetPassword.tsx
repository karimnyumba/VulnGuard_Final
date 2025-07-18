import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Loader2, ArrowLeft, Eye } from "lucide-react";
import { useNotification } from '@/hooks/useNotification';
import { OtpVerification } from './OtpVerification';

interface ResetPasswordProps {
  email: string;
  providedOtp?: string;
}

export const ResetPassword = ({ email, providedOtp }: ResetPasswordProps) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const { success, error: notificationError } = useNotification();

  const validatePassword = () => {
    if (newPassword.length < 6) {
      notificationError('Password must be at least 6 characters long.');
      setError('Password must be at least 6 characters long.');
      return false;
    }

    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasSymbol = /[^a-zA-Z0-9]/.test(newPassword);

    if (!hasLetter || !hasSymbol) {
      notificationError('Password must contain at least one letter and one symbol.');
      setError('Password must contain at least one letter and one symbol.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      notificationError('Passwords do not match.');
      setError('Passwords do not match.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword()) {
      setLoading(false);
      return;
    }

    setShowOtp(true);
    setLoading(false);
  };

  if (showOtp) {
    return (
      <OtpVerification 
        email={email} 
        providedOtp={providedOtp} 
        mode="password-reset"
        newPassword={newPassword}
        onSuccess={() => navigate('/login')} 
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
          <span className="text-gray-600 text-lg">Create new password</span>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="newPassword" className="block text-base font-medium text-gray-700 mb-1">New Password</label>
            <input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-sm leading-5"
            >
              <Eye className="h-5 w-5 text-gray-400" />
            </button>
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
              "Continue to Verification"
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-md transition text-base flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
}; 