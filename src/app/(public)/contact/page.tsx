import ContactClient from './ContactClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Inspire Soft team. Send us a message, find our office location, email, or working hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
