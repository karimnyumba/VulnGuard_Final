import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { Eye, Loader2, Shield } from "lucide-react";
import { useNotification } from '@/hooks/useNotification';
import { OtpVerification } from './OtpVerification';


export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessPhone: '',
    businessName: 'Default Company',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [providedOtp, setProvidedOtp] = useState<string>('');
  const { success, error: notificationError } = useNotification();

  const validateForm = () => {
    const { email, password, confirmPassword, businessPhone } = formData;
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

    if (password !== confirmPassword) {
      notificationError('Passwords do not match.');
      setError('Passwords do not match.');
      return false;
    }

    if (!businessPhone.trim()) {
      notificationError('Phone number is required.');
      setError('Phone number is required.');
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
      const response = await AuthService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.businessName,
        formData.businessPhone,
        '',
        ''
      );
      setLoading(false);
      
      // Always show OTP screen, regardless of email status
      if (!response.emailSent) {
        // Email failed, show OTP to user
        setProvidedOtp(response.otp);
        success('Registration successful. Email sending failed. Please use the OTP provided below.');
      } else {
        // Email sent successfully
        success('Registration successful. Please check your email for the verification code.');
      }
      
      setShowOtp(true);
    } catch (err: any) {
      notificationError(err.response?.data?.message || 'Registration failed');
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  if (showOtp) {
    return <OtpVerification email={formData.email} providedOtp={providedOtp} onSuccess={() => navigate('/login')} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
          <span className="text-gray-600 text-lg">Create your account to get started</span>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
          <div>
            <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base pr-10"
            />
          </div>
          <div>
            <label htmlFor="businessPhone" className="block text-base font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="businessPhone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.businessPhone}
              onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
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
                                "Create Account"
                              )}
          </button>
 
          <div className="text-center text-base text-gray-600 pt-2">
            Already have an account?{' '}
            <a href='/login' type="button" className="text-blue-500 hover:underline font-medium">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

// OTP Verification Component
// export const OtpVerification = ({ email, onSuccess }: { email: string; onSuccess: () => void }) => {
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { success, error: notificationError } = useNotification();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       // You need to implement AuthService.verifyOtp(email, otp)
//       await AuthService.verifyOtp(email, otp);
//       success('OTP verified successfully!');
//       setLoading(false);
//       onSuccess();
//     } catch (err: any) {
//       notificationError(err.response?.data?.message || 'OTP verification failed');
//       setError(err.response?.data?.message || 'OTP verification failed');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
//       <div className="w-full max-w-md mx-auto">
//         <div className="flex flex-col items-center mb-6">
//           <Shield className="w-10 h-10 text-blue-400 mb-2" />
//           <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
//           <span className="text-gray-600 text-lg">Enter the OTP sent to your email</span>
//         </div>
//         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
//           <div>
//             <label htmlFor="otp" className="block text-base font-medium text-gray-700 mb-1">OTP Code</label>
//             <input
//               id="otp"
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
//             />
//           </div>
//           {error && <div className="text-red-500 text-sm text-center">{error}</div>}
//           <button
//             type="submit"
//             className="w-full bg-[#42a5ea] hover:bg-[#2196f3] text-white font-semibold py-3 rounded-md transition text-base"
//           >
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               </div>
//             ) : (
//               "Verify OTP"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
