// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GA4_ECOMMERCE_EVENTS = [
  'add_payment_info',
  'add_shipping_info',
  'add_to_cart',
  'add_to_wishlist',
  'begin_checkout',
  'purchase',
  'refund',
  'remove_from_cart',
  'select_item',
  'select_promotion',
  'view_cart',
  'view_item',
  'view_item_list',
  'view_promotion',
];

export const isEcommerceEvent = (eventName: string): boolean => {
  return GA4_ECOMMERCE_EVENTS.includes(eventName);
};
