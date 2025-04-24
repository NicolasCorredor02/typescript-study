export type Product = {
    _id: string;
    title: string;
    description: string;
    code: string;
    category: string;
    price: number;
    stock: number;
    status: boolean;
    thumbnails: string[];
}