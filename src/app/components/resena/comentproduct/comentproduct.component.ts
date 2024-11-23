import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewReport } from '../../../models/review_report';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentproduct',
  templateUrl: './comentproduct.component.html',
  styleUrl: './comentproduct.component.css'
})
export class ComentproductComponent {

  productId!: number;
  dsResenas: ReviewReport[] = [];
  isAdmin: boolean = false;
  currentUserId!: number;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkUserRoles();
    this.currentUserId = Number(this.userService.getUserIdActual());
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.loadReviewsByProduct();
    } else {
      this.snackBar.open('No se encontró el ID del producto', 'OK', { duration: 2000 });
    }
  }

  loadReviewsByProduct() {
    this.reviewService.getReviewReportByProduct(this.productId).subscribe({
      next: (reviews: ReviewReport[]) => {
        this.dsResenas = reviews;
      },
      error: () => {
        this.snackBar.open('Error al cargar reseñas', 'OK', { duration: 2000 });
      }
    });
  }

  checkUserRoles() {
    const authorities = this.userService.getAuthoritiesActual();
    if (authorities) {
      this.isAdmin = authorities.includes('ADMIN');
    }
  }

  getStars(score: number): number[] {
    return Array(score).fill(0);
  }

  // Abrir diálogo de confirmación antes de eliminar
  openConfirmDialog(reviewId: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(reviewId);
      }
    });
  }

  onDelete(reviewId: number) {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.loadReviewsByProduct(); // Recargar reseñas
        this.snackBar.open('Reseña eliminada correctamente.', 'OK', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Error al eliminar la reseña.', 'OK', { duration: 2000 });
      }
    });
  }

  goBack() {
    this.router.navigate(['/shop-products']); // Cambia '/productos' según la ruta deseada
  }
  
}
