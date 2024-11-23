import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.css'
})
export class AddProductoComponent {
 
  addEditProducto!: FormGroup;
  categories!: Category[];
  productoId = 0;

  base64Logo: string | null = null; // Para almacenar el logo en Base64
  archivoLogo: File | null = null; // Para almacenar el archivo seleccionado

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCategorias();

    // Verificar si estamos editando o agregando
    this.productoId = parseInt(this.activatedRoute.snapshot.params['id'], 10) || 0;
    if (this.productoId > 0) {
      this.cargarProducto();
    }
  }

  crearFormulario(): void {
    this.addEditProducto = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      logo: [''] // Logo opcional
    });
  }

  cargarCategorias(): void {
    this.categoryService.getCategorys().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar las categorías', 'OK', { duration: 2000 });
      }
    });
  }

  cargarProducto(): void {
    this.productService.getProduct(this.productoId).subscribe({
      next: (product: Product) => {
        // Poner los datos del producto en el formulario
        this.addEditProducto.patchValue({
          id: product.id,
          name: product.name,
          categoryId: product.categoryId,
          price: product.price,
          stock: product.stock
        });

        // Si el logo existe, convertirlo a Base64
        if (product.logo) {
          this.base64Logo = `data:image/jpeg;base64,${product.logo}`;
        }
      },
      error: () => {
        this.snackBar.open('Error al cargar el producto', 'OK', { duration: 2000 });
      }
    });
  }

  grabarProducto(): void {
    const product = this.addEditProducto.value;

    if (this.productoId === 0) {
      // Inserción de un nuevo producto
      this.productService.insertProduct(product).subscribe({
        next: (nuevoProducto: Product) => {
          if (this.archivoLogo) {
            this.actualizarLogo(nuevoProducto.id);
          } else {
            this.router.navigate(['/productos']);
            this.snackBar.open('Producto registrado exitosamente', 'OK', { duration: 2000 });
          }
        },
        error: () => {
          this.snackBar.open('Error al registrar el producto', 'OK', { duration: 2000 });
        }
      });
    } else {
      // Actualización de un producto existente
      product.id = this.productoId;
      this.productService.editarProduct(product).subscribe({
        next: () => {
          if (this.archivoLogo) {
            this.actualizarLogo(this.productoId);
          } else {
            this.router.navigate(['/productos']);
            this.snackBar.open('Producto actualizado exitosamente', 'OK', { duration: 2000 });
          }
        },
        error: () => {
          this.snackBar.open('Error al actualizar el producto', 'OK', { duration: 2000 });
        }
      });
    }
  }

  actualizarLogo(productId: number): void {
    const formData = new FormData();
    formData.append('logo', this.archivoLogo!);

    this.productService.editarLogo(productId, formData).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
        this.snackBar.open('Logo actualizado exitosamente', 'OK', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Error al actualizar el logo', 'OK', { duration: 2000 });
      }
    });
  }

  actualizaLogo(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    this.archivoLogo = fileInput.files![0];

    if (this.archivoLogo) {
      const reader = new FileReader();
      reader.readAsDataURL(this.archivoLogo);
      reader.onload = () => {
        this.base64Logo = reader.result as string; // Almacena el logo en Base64
      };
    }
  }
}

