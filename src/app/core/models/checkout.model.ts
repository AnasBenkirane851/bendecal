import { CartLine } from './cart-line.model';

export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
}

export interface CheckoutAddress {
  line1: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutPayload {
  customer: CheckoutCustomer;
  address: CheckoutAddress;
  lines: CartLine[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CheckoutCustomer;
  address: CheckoutAddress;
  lines: CartLine[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}
