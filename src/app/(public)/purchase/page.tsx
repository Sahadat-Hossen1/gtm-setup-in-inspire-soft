import PurchaseClient from './PurchaseClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Complete your order securely at Inspire Soft. Provide your delivery and contact details to finalize your purchase.",
};

export default function PurchasePage() {
  return <PurchaseClient />;
}
