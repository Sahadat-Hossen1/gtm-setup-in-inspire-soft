import LoginClient from './LoginClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Inspire Soft account to manage your profile, view orders, and checkout securely.",
};

export default function LoginPage() {
  return <LoginClient />;
}
