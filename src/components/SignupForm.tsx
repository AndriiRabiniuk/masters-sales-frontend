import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from 'next-i18next';
import { register } from '@/services/api';

interface SignupFormProps {
  onSuccess?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await register(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      // Prevent error from propagating up
      e.stopPropagation?.();
      
      console.error('Registration error:', err);
      
      // Improved error handling to prevent app from crashing
      let errorMessage = 'An error occurred during registration. Please try again.';
      
      if (err.response) {
        // Handle Axios error response
        if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.status === 400) {
          errorMessage = 'Invalid registration data. Please check your information.';
        } else if (err.response.status === 409) {
          errorMessage = 'User with this email already exists.';
        } else if (err.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
      
      // Return false to prevent error from bubbling up
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-8">{t('signup.title') || 'Create an Account'}</h2>
        
        {error && (
          <Alert className="mb-8 bg-red-900/20 border-red-900 text-red-300">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-8 bg-green-900/20 border-green-900 text-green-300">
            <AlertDescription>{t('signup.successMessage') || 'Registration successful! You can now log in.'}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-base">{t('signup.name') || 'Full Name'}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700 text-white mt-2 h-12 px-4"
                placeholder={t('signup.namePlaceholder') || 'Enter your name'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-base">{t('signup.email') || 'Email Address'}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700 text-white mt-2 h-12 px-4"
                placeholder={t('signup.emailPlaceholder') || 'Enter your email'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-base">{t('signup.password') || 'Password'}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-zinc-700 text-white mt-2 h-12 px-4"
                placeholder={t('signup.passwordPlaceholder') || 'Create a secure password'}
              />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-6"
            >
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 h-12 text-base font-medium"
                disabled={loading}
              >
                {loading ? (
                  <span>{t('signup.submitting') || 'Signing up...'}</span>
                ) : (
                  <span>{t('signup.submit') || 'Sign Up'}</span>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignupForm; 