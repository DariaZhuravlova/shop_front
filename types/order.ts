export type Order = {
  _id: string;
  number: string;
  guestContact: {
    name: string;
    phone: string;
    email: string;
  };
  totalPrice: number;
}