import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductReport } from '../../../models/product_report';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrl: './shop-products.component.css'
})
export class ShopProductsComponent implements OnInit {

  categories: Category[] = [];
  products: ProductReport[] = [];
  filteredProducts: ProductReport[] = [];
  selectedCategoryId: number | null = null;
  totalProducts: number = 0; // Contador de productos en el carrito

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  // Cargar categorías desde el servicio
  loadCategories() {
    this.categoryService.getCategorys().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: () => {
        this.snackBar.open('Error al cargar categorías', 'OK', { duration: 2000 });
      }
    });
  }

  loadProducts() {
    this.productService.getProductReport().subscribe({
      next: (products: ProductReport[]) => {
        console.log(products); // Verifica si el logo está llegando como Base64
        this.products = products;
        this.filteredProducts = products;
      },
      error: () => {
        this.snackBar.open('Error al cargar productos', 'OK', { duration: 2000 });
      }
    });
  }
  
  // Filtrar productos por categoría seleccionada
  onCategoryChange(categoryId: number | null) {
    this.selectedCategoryId = categoryId; // Guarda la categoría seleccionada
    this.filterProducts(); // Llama a la lógica de filtrado general
  }

  // Filtrar productos por texto
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterProducts(filterValue); // Llama a la lógica de filtrado general con el texto
  }

  // Lógica de filtrado combinada
  private filterProducts(filterText: string = '') {
    // Filtrar por categoría si está seleccionada
    let filteredByCategory = this.selectedCategoryId
      ? this.products.filter(
          product => this.getCategoryIdByName(product.categoryName) === this.selectedCategoryId
        )
      : this.products;

    // Filtrar por texto (si aplica)
    this.filteredProducts = filteredByCategory.filter(product =>
      product.name.toLowerCase().includes(filterText)
    );
  }

  // Obtener el ID de una categoría a partir de su nombre
  private getCategoryIdByName(categoryName: string): number | null {
    const category = this.categories.find(cat => cat.type === categoryName);
    return category ? category.id : null;
  }

  onBuy(product: ProductReport) {
    this.snackBar.open(`Producto "${product.name}" agregado al carrito`, 'OK', { duration: 2000 });
    this.router.navigate(['/detalleCompra-add'], { queryParams: { productId: product.id } });
  }

  onAddReview(product: ProductReport) {
    this.snackBar.open(`Agregue una nueva reseña para "${product.name}"`, 'OK', { duration: 2000 });
    this.router.navigate(['/resena-add'], {
      queryParams: { fromShopProducts: true, productId: product.id },
    });
  }

  // Navegar al carrito
  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  
}
