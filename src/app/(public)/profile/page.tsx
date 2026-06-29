import ProfileClient from './ProfileClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Account",
  description: "View your profile details, order history, saved addresses, and manage your account settings at Inspire Soft.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
