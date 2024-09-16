export type ProductData = {
    _id?: string;
    name: string;
    price: number;
    quantitiesInStore: number;
    description: string;
    image: string[];
    category: number;
    subcategory: number;
    mainImagePointer: number;
    characteristics: { [key: string]: string }
}