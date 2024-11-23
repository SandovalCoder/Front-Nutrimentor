export interface Product {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    stock: number;
    logo?: string;
}