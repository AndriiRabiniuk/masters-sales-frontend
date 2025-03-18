import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import SignupForm from '@/components/SignupForm';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleSignupSuccess = () => {
    // Remove automatic redirect to login page
    // Just keep the success message displaying
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('signup.pageTitle') || 'Join our Community'}
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            {t('signup.pageSubtitle') || 'Create your account to access exclusive content and features.'}
          </p>
        </motion.div>
        
        <SignupForm onSuccess={handleSignupSuccess} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default SignupPage; 