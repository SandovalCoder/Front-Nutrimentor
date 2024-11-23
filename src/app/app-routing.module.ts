import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientesComponent } from './components/clientes/list-clientes/list-clientes.component';
import { AddClientesComponent } from './components/clientes/add-clientes/add-clientes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogeadoGuard } from './guards/logeado.guard';
import { AdminGuard} from './guards/admin.guard';
import { HealthGuard } from './guards/health.guard';
import { MultiRoleGuard } from './guards/multirol.guard';
import { AddCategoriasComponent } from './components/categoria/add-categorias/add-categorias.component';
import { LisCategoriasComponent } from './components/categoria/lis-categorias/lis-categorias.component';
import { ListEspecialidadComponent } from './components/especialidad/list-especialidad/list-especialidad.component';
import { AddEspecialidadComponent } from './components/especialidad/add-especialidad/add-especialidad.component';
import { ListProductoComponent } from './components/producto/list-producto/list-producto.component';
import { AddProductoComponent } from './components/producto/add-producto/add-producto.component';
import { ListCompraComponent } from './components/compra/list-compra/list-compra.component';
import { AddCompraComponent } from './components/compra/add-compra/add-compra.component';
import { ListProfesionalesComponent } from './components/profesionalsalud/list-profesionales/list-profesionales.component';
import { AddProfesionalesComponent } from './components/profesionalsalud/add-profesionales/add-profesionales.component';
import { ListRecomendacionComponent } from './components/recomendacion/list-recomendacion/list-recomendacion.component';
import { AddRecomendacionComponent } from './components/recomendacion/add-recomendacion/add-recomendacion.component';
import { ListSeguimientoComponent } from './components/seguimiento/list-seguimiento/list-seguimiento.component';
import { AddSeguimientoComponent } from './components/seguimiento/add-seguimiento/add-seguimiento.component';
import { ListDetallecompraComponent } from './components/detallecompra/list-detallecompra/list-detallecompra.component';
import { AddDetallecompraComponent } from './components/detallecompra/add-detallecompra/add-detallecompra.component';
import { ListResenaComponent } from './components/resena/list-resena/list-resena.component';
import { AddResenaComponent } from './components/resena/add-resena/add-resena.component';
import { ListObjetivosaludComponent } from './components/objetivosalud/list-objetivosalud/list-objetivosalud.component';
import { AddObjetivosaludComponent } from './components/objetivosalud/add-objetivosalud/add-objetivosalud.component';
import { ListPreguntasComponent } from './components/preguntas/list-preguntas/list-preguntas.component';
import { AddPreguntasComponent } from './components/preguntas/add-preguntas/add-preguntas.component';
import { ShopProductsComponent } from './components/producto/shop-products/shop-products.component';
import { ComentproductComponent } from './components/resena/comentproduct/comentproduct.component';
import { CartProductoComponent } from './components/producto/cart-producto/cart-producto.component';
import { ClientQuestionComponent } from './components/preguntas/client-question/client-question.component';
import { PerfilComponent } from './components/clientes/perfil/perfil.component';
import { AdminAddDetallecompraComponent } from './components/detallecompra/admin-add-detallecompra/admin-add-detallecompra.component';
import { ProfessionalQuestionComponent } from './components/preguntas/professional-question/professional-question.component';
import { UsersrecomenComponent } from './components/recomendacion/usersrecomen/usersrecomen.component';
import { UserGuard } from './guards/user.guard';
import path from 'path';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AdmhealtGuard } from './guards/admhealt.guard';



const routes: Routes = [
  { path: '' , component:HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [LogeadoGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LogeadoGuard], children: [{ path: 'servicios', component: ServiciosComponent }] },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ListClientesComponent, canActivate: [AdminGuard] },
  { path: 'clientes-add', component: AddClientesComponent, canActivate: [AdminGuard] },
  {path:  'clients-edit/:id', component: AddClientesComponent, canActivate: [AdminGuard] },
  { path: 'categorias', component: LisCategoriasComponent, canActivate: [AdminGuard] },
  { path: 'categoria_add', component: AddCategoriasComponent, canActivate: [AdminGuard] },
  { path: 'categoria-edit/:id', component: AddCategoriasComponent, canActivate: [AdminGuard] },
  { path: 'especialidades', component: ListEspecialidadComponent, canActivate: [AdminGuard]},
  { path: 'especialidad-add', component: AddEspecialidadComponent, canActivate: [AdminGuard]},
  { path: 'especialidad-edit/:id', component: AddEspecialidadComponent, canActivate: [AdminGuard]},
  { path: 'productos', component: ListProductoComponent, canActivate: [AdminGuard]},
  { path: 'producto-add', component: AddProductoComponent, canActivate: [AdminGuard]},
  { path: 'producto-edit/:id', component: AddProductoComponent, canActivate: [AdminGuard]},
  { path: 'compras', component: ListCompraComponent, canActivate: [MultiRoleGuard] },
  { path: 'compra-add', component: AddCompraComponent, canActivate: [AdminGuard] },
  { path: 'compra-edit/:id', component: AddCompraComponent, canActivate: [AdminGuard] },
  { path: 'detalleCompra',component: ListDetallecompraComponent, canActivate: [MultiRoleGuard] },
  { path: 'detalleCompraadmin-add', component: AdminAddDetallecompraComponent, canActivate: [AdminGuard] },
  { path: 'detalleCompraadmin-edit/:id', component: AdminAddDetallecompraComponent, canActivate: [AdminGuard] },
  { path: 'profesionales', component: ListProfesionalesComponent, canActivate: [AdmhealtGuard] },
  { path: 'profesional-add', component: AddProfesionalesComponent, canActivate: [AdminGuard] },
  { path: 'profesional-edit/:id', component: AddProfesionalesComponent, canActivate: [AdminGuard] },
  { path: 'recomendaciones', component: ListRecomendacionComponent, canActivate: [AdmhealtGuard] },
  { path: 'recomendacion-add', component: AddRecomendacionComponent, canActivate: [AdminGuard] },
  { path: 'recomendacion-edit/:id', component: AddRecomendacionComponent, canActivate: [AdminGuard] },
  { path: 'seguimientos', component: ListSeguimientoComponent, canActivate: [AdmhealtGuard] },
  { path: 'tracking-add', component: AddSeguimientoComponent, canActivate: [AdminGuard] },
  { path: 'tracking-edit/:id', component: AddSeguimientoComponent, canActivate: [AdminGuard] },
  { path: 'resenas', component: ListResenaComponent, canActivate: [AdminGuard] },
  { path: 'resena-add', component: AddResenaComponent, canActivate: [MultiRoleGuard] },
  { path: 'resena-edit/:id', component: AddResenaComponent, canActivate: [AdminGuard] },
  { path: 'objetivosSalud', component: ListObjetivosaludComponent, canActivate: [MultiRoleGuard] },
  { path: 'objetivosalud-add', component: AddObjetivosaludComponent, canActivate: [AdminGuard] },
  { path: 'objetivosalud-edit/:id', component: AddObjetivosaludComponent, canActivate: [AdminGuard] },
  { path: 'preguntas', component: ListPreguntasComponent, canActivate: [AdminGuard] },
  { path: 'pregunta-add', component: AddPreguntasComponent, canActivate: [AdminGuard] },
  { path: 'pregunta-edit/:id', component: AddPreguntasComponent, canActivate: [AdminGuard] },
  //Logica de negocio.
  { path: 'shop-products',component:ShopProductsComponent, canActivate: [MultiRoleGuard] },
  { path: 'resenaprodu/:id', component: ComentproductComponent, canActivate: [MultiRoleGuard] },
  { path: 'cart', component: CartProductoComponent, canActivate: [MultiRoleGuard] },
  { path: 'questioncliente', component: ClientQuestionComponent, canActivate: [MultiRoleGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [UserGuard] },
  {path:  'perfilprofesional', component: PerfilComponent, canActivate: [HealthGuard] },
  { path: 'detalleCompra-add', component: AddDetallecompraComponent, canActivate: [MultiRoleGuard] },
  { path: 'client-question', component: ProfessionalQuestionComponent, canActivate: [HealthGuard] },
  { path: 'usersrecomendaciones', component: UsersrecomenComponent, canActivate: [MultiRoleGuard] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
