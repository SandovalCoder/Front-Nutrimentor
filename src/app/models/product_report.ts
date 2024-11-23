export interface ProductReport {
    id: number;
    name: string;
    categoryName: string;
    categoryId: number; // Incluye este campo
    price: number;
    stock: number;
    logo?: string; // Si tienes imágenes
}
