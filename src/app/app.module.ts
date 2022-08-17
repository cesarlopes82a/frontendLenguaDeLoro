import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatSliderModule } from '@angular/material/slider';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PrivateComponent } from './components/private/private.component';
import { GlobalComponent } from './components/global/global.component';

import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { CreateStoreComponent } from './components/store/create-store/create-store.component';
import { StoreDashboardComponent } from './components/store/storeDashboard/storeDashboard.component';
import { HomeComponent } from './components/home/home.component';

import { StoreProductosComponent } from './components/store/storeDashboard/store-productos/store-productos.component';
import { NuevoProductoComponent } from './components/store/storeDashboard/storeProductos/nuevo-producto/nuevo-producto.component';

import { StoreUsuariosComponent } from './components/store/storeDashboard/store-usuarios/store-usuarios.component';
import { ListarUsuariosComponent } from './components/store/storeDashboard/storeUsuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './components/store/storeDashboard/storeUsuarios/editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './components/store/storeDashboard/storeUsuarios/nuevo-usuario/nuevo-usuario.component';

import { StoreSucursalesComponent } from './components/store/storeDashboard/store-sucursales/store-sucursales.component';
import { ListarSucComponent } from './components/store/storeDashboard/storeSucursales/listar-suc/listar-suc.component';
import { EditarSucComponent } from './components/store/storeDashboard/storeSucursales/editar-suc/editar-suc.component';
import { NuevaSucComponent } from './components/store/storeDashboard/storeSucursales/nueva-suc/nueva-suc.component';

import { UsersComponent } from './components/users/users.component';
import { EditarUsuarioGlobalComponent } from './components/users/editar-usuario/editar-usuario.component';
import { ListarUsuariosGlobalComponent } from './components/users/listar-usuarios/listar-usuarios.component';
import { NuevoUsuarioGlobalComponent } from './components/users/nuevo-usuario/nuevo-usuario.component';

import { EstadisticasGlobalComponent } from './components/statistics/estadisticas/estadisticas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarVendedoresComponent } from './components/store/storeDashboard/storeSucursales/listar-vendedores/listar-vendedores.component';
import { NuevoVendedorComponent } from './components/store/storeDashboard/storeSucursales/nuevo-vendedor/nuevo-vendedor.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { EditarSupplierComponent } from './components/supplier/editar-supplier/editar-supplier.component';
import { NuevoSupplierComponent } from './components/supplier/nuevo-supplier/nuevo-supplier.component';
import { ComprasComponent } from './components/store/storeDashboard/storeSucursales/compras/main/compras/compras.component';
import { RegistrarCompraComponent } from './components/store/storeDashboard/storeSucursales/compras/new/registrar-compra/registrar-compra.component';
import { StockComponent } from './components/store/storeDashboard/storeSucursales/stock/main/stock/stock.component';
import { VentasComponent } from './components/store/storeDashboard/storeSucursales/ventas/main/ventas/ventas.component';
import { VenderComponent } from './components/store/storeDashboard/storeSucursales/ventas/new/vender/vender.component';
import { ListarventasComponent } from './components/store/storeDashboard/storeSucursales/ventas/listar/listarventas/listarventas.component';
import { LDPmainComponent } from './components/store/storeDashboard/storeLdP/main/ldpmain/ldpmain.component';
import { NewldpComponent } from './components/store/storeDashboard/storeLdP/new/newldp/newldp.component';
import { TransformNullsPipe } from './transform-nulls.pipe';
import { DialogprecioComponent } from './components/store/storeDashboard/storeLdP/dialogPrecio/dialogprecio/dialogprecio.component';
import { DialogventaComponent } from './components/store/storeDashboard/storeSucursales/ventas/new/dialogventa/dialogventa.component';
import { FiltroproductosPipe } from './components/store/storeDashboard/storeSucursales/ventas/new/dialogventa/pipes/filtroproductos.pipe';
import { FiltrofechavtasPipe } from './components/store/storeDashboard/storeSucursales/ventas/listar/pipes/filtrofechavtas.pipe';
import { DialogquitartiendaComponent } from './components/users/dialogs/dialogquitartienda/dialogquitartienda.component';
import { BranchLDPmainComponent } from './components/store/storeDashboard/storeSucursales/branchLdP/main/branch-ldpmain/branch-ldpmain.component';
import { NewBranchLDPComponent } from './components/store/storeDashboard/storeSucursales/branchLdP/new/new-branch-ldp/new-branch-ldp.component';
import { DialogajusteComponent } from './components/store/storeDashboard/storeSucursales/stock/main/dialogajuste/dialogajuste.component';
import { DialogpagosComponent } from './components/store/storeDashboard/storeSucursales/ventas/new/dialogpagos/dialogpagos.component';

import { NgxChartsModule }from '@swimlane/ngx-charts';
import { EstadistSucursalComponent } from './components/store/storeDashboard/storeSucursales/estadisticas/main/estadist-sucursal/estadist-sucursal.component';
import { DialogpreciomasivoComponent } from './components/store/storeDashboard/storeLdP/dialogPrecioMasivo/dialogpreciomasivo/dialogpreciomasivo.component';
import { EstadistTiendaComponent } from './components/store/storeDashboard/storeEstadisticas/estadisticas/main/estadist-tienda/estadist-tienda.component';
import { EditarProductov2Component } from './components/store/storeDashboard/storeProductos/editar-productov2/editar-productov2.component';
import { RubrosComponent } from './components/store/storeDashboard/storeRubros/main/rubros/rubros.component';
import { NuevorubroComponent } from './components/store/storeDashboard/storeRubros/dialogs/nuevorubro/nuevorubro.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    NavbarComponent,
    SidebarComponent,
    PrivateComponent,
    GlobalComponent,
    AboutComponent,
    CreateStoreComponent,
    StoreDashboardComponent,
    HomeComponent,
    StoreUsuariosComponent,
    StoreProductosComponent,
    NuevoProductoComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,
    NuevoUsuarioComponent,
    StoreSucursalesComponent,
    ListarSucComponent,
    EditarSucComponent,
    NuevaSucComponent,
    UsersComponent,
    EditarUsuarioGlobalComponent,
    ListarUsuariosGlobalComponent,
    NuevoUsuarioGlobalComponent,
    EstadisticasGlobalComponent,
    ListarVendedoresComponent,
    NuevoVendedorComponent,
    SupplierComponent,
    EditarSupplierComponent,
    NuevoSupplierComponent,
    ComprasComponent,
    RegistrarCompraComponent,
    StockComponent,
    VentasComponent,
    VenderComponent,
    ListarventasComponent,
    LDPmainComponent,
    NewldpComponent,
    TransformNullsPipe,
    DialogprecioComponent,
    DialogventaComponent,
    FiltroproductosPipe,
    FiltrofechavtasPipe,
    DialogquitartiendaComponent,
    BranchLDPmainComponent,
    NewBranchLDPComponent,
    DialogajusteComponent,
    DialogpagosComponent,
    EstadistSucursalComponent,
    DialogpreciomasivoComponent,
    EstadistTiendaComponent,
    EditarProductov2Component,
    RubrosComponent,
    NuevorubroComponent
    
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatListModule,
    NgxChartsModule,
    MatRadioModule
    
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },

    MatSidenav
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
