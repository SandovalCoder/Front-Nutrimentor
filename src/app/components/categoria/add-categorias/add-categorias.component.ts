import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-categorias',
  templateUrl: './add-categorias.component.html',
  styleUrl: './add-categorias.component.css'
})
export class AddCategoriasComponent {

  addEditCategoria!: FormGroup;
  categoriaId = 0;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.creaFormulario();
    // Obtenemos el ID de la categoría desde los parámetros de la ruta
    this.categoriaId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    
    // Verificamos si es NaN o undefined y establecemos a 0 para modo de creación
    if (isNaN(this.categoriaId)) {
      this.categoriaId = 0;
    }

    if (this.categoriaId > 0) {
      // Modo de actualización
      this.cargarCategoria();
    }
  }

  creaFormulario() {
    this.addEditCategoria = this.formBuilder.group({
      id: [""],
      type: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  cargarCategoria() {
    // Obtenemos la categoría existente para cargarla en el formulario
    this.categoryService.getCategory(this.categoriaId).subscribe({
      next: (categoria: Category) => {
        this.addEditCategoria.get("id")?.setValue(categoria.id);
        this.addEditCategoria.get("type")?.setValue(categoria.type);
        this.addEditCategoria.get("description")?.setValue(categoria.description);
      },
      error: (err) => {
        console.error("Error al cargar categoría:", err);
      }
    });
  }

  grabarCategoria() {
    if (this.addEditCategoria.invalid) {
      this.snackBar.open("Por favor, completa todos los campos obligatorios", "OK", { duration: 2000 });
      return;
    }

    const categoria: Category = {
      id: this.addEditCategoria.get("id")?.value,
      type: this.addEditCategoria.get("type")?.value,
      description: this.addEditCategoria.get("description")?.value
    };

    if (this.categoriaId === 0) {
      // Modo de creación
      this.categoryService.insertCategory(categoria).subscribe({
        next: () => {
          this.router.navigate(['/categorias']);
          this.snackBar.open("Se registró correctamente la categoría", "OK", { duration: 2000 });
        },
        error: (err) => {
          this.snackBar.open("Hubo un error en el registro de la categoría", "OK", { duration: 2000 });
          console.error("Error al registrar categoría:", err);
        }
      });
    } else {
      // Modo de actualización
      this.categoryService.editarCategory(categoria).subscribe({
        next: () => {
          this.router.navigate(['/categorias']);
          this.snackBar.open("Se actualizó correctamente la categoría", "OK", { duration: 2000 });
        },
        error: (err) => {
          this.snackBar.open("Hubo un error en la actualización de la categoría", "OK", { duration: 2000 });
          console.error("Error al actualizar categoría:", err);
        }
      });
    }
  }
  
}
    
  

