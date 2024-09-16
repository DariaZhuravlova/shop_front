export type CartData = {
  user: string;
  guestContact: {
    name: string;
    email: string;
    phone: string;
  }
  products: {
    product: string;
    quantity: number;
  }[]
}