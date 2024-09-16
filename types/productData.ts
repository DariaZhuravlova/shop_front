export type ProductData = {
    _id?: string;
    name: string;
    oldPrice: number;
    price: number;
    quantitiesInStore: number;
    description: string;
    image: string[];
    category: number;
    subcategory: number;
    mainImagePointer: number;
    characteristics: { [key: string]: string }
}