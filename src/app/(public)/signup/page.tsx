import SignupClient from './SignupClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your demo Inspire Soft account.',
};

export default function SignupPage() {
  return <SignupClient />;
}