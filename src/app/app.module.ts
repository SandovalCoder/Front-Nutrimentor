import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { MisionVisionComponent } from './components/mision-vision/mision-vision.component';
import { FAQComponent } from './components/faq/faq.component';
import { ListClientesComponent } from './components/clientes/list-clientes/list-clientes.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient} from '@angular/common/http';
import { LisCategoriasComponent } from './components/categoria/lis-categorias/lis-categorias.component';
import { AddCategoriasComponent } from './components/categoria/add-categorias/add-categorias.component';
import { AutorizacionInterceptor } from './interceptors/autorizacion.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HealthGuard } from './guards/health.guard';
import { UserGuard } from './guards/user.guard';
import { LogeadoGuard } from './guards/logeado.guard';
import { AdminGuard } from './guards/admin.guard';
import { ConfirmarEliminarComponent } from './components/confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { ListEspecialidadComponent } from './components/especialidad/list-especialidad/list-especialidad.component';
import { AddEspecialidadComponent } from './components/especialidad/add-especialidad/add-especialidad.component';
import { AddProductoComponent } from './components/producto/add-producto/add-producto.component';
import { ListProductoComponent } from './components/producto/list-producto/list-producto.component';
import { ListProfesionalesComponent } from './components/profesionalsalud/list-profesionales/list-profesionales.component';
import { AddProfesionalesComponent } from './components/profesionalsalud/add-profesionales/add-profesionales.component';
import { ListCompraComponent } from './components/compra/list-compra/list-compra.component';
import { AddCompraComponent } from './components/compra/add-compra/add-compra.component';
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
import { ProfessionalQuestionComponent } from './components/preguntas/professional-question/professional-question.component';
import { AddClientesComponent } from './components/clientes/add-clientes/add-clientes.component';
import { PerfilComponent } from './components/clientes/perfil/perfil.component';
import { AdminAddDetallecompraComponent } from './components/detallecompra/admin-add-detallecompra/admin-add-detallecompra.component';
import { PerfilprofesionalComponent } from './components/clientes/perfilprofesional/perfilprofesional.component';
import { UsersrecomenComponent } from './components/recomendacion/usersrecomen/usersrecomen.component';




@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    HomeComponent,
    FooterComponent,
    NosotrosComponent,
    ServiciosComponent,
    MisionVisionComponent,
    FAQComponent,
    ListClientesComponent,
    LisCategoriasComponent,
    LoginComponent,
    AddCategoriasComponent,
    ConfirmarEliminarComponent,
    ListEspecialidadComponent,
    AddEspecialidadComponent,
    AddProductoComponent,
    ListProductoComponent,
    ListProfesionalesComponent,
    AddProfesionalesComponent,
    ListCompraComponent,
    AddCompraComponent,
    ListRecomendacionComponent,
    AddRecomendacionComponent,
    ListSeguimientoComponent,
    AddSeguimientoComponent,
    ListDetallecompraComponent,
    AddDetallecompraComponent,
    ListResenaComponent,
    AddResenaComponent,
    ListObjetivosaludComponent,
    AddObjetivosaludComponent,
    ListPreguntasComponent,
    AddPreguntasComponent,
    ShopProductsComponent,
    ComentproductComponent,
    CartProductoComponent,
    ClientQuestionComponent,
    ProfessionalQuestionComponent,
    AddClientesComponent,
    PerfilComponent,
    AdminAddDetallecompraComponent,
    PerfilprofesionalComponent,
    UsersrecomenComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    HttpClientModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass:AutorizacionInterceptor, multi:true },
    AdminGuard,
    LogeadoGuard,
    HealthGuard,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
