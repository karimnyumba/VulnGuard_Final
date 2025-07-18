import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNotification } from '@/hooks/useNotification';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/authService';

const formSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type PasswordChangeFormData = z.infer<typeof formSchema>;

export function usePasswordChange() {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useNotification();
  const { logout } = useAuth();

  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordChangeFormData) => {
    try {
      setIsLoading(true);

      await AuthService.changePassword(data.currentPassword, data.newPassword);

      success('Password changed successfully', {
        description: 'Your password has been updated successfully'
      });

      // Logout user after password change for security
      logout();
      form.reset();
    } catch (err: any) {
      if (err.response?.status === 401) {
        error('Session expired', {
          description: 'Please log in again to continue'
        });
        logout();
      } else {
        error('Failed to change password', {
          description: err.response?.data?.error || 'An unexpected error occurred'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
} 