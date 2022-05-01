import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';


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
import { ListarProductosComponent } from './components/store/storeDashboard/storeProductos/listar-productos/listar-productos.component';
import { EditarProductoComponent } from './components/store/storeDashboard/storeProductos/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './components/store/storeDashboard/storeProductos/nuevo-producto/nuevo-producto.component';

import { ListarRubrosComponent } from './components/store/storeDashboard/storeProductos/listar-rubros/listar-rubros.component';
import { EditarRubroComponent } from './components/store/storeDashboard/storeProductos/editar-rubro/editar-rubro.component';
import { NuevoRubroComponent } from './components/store/storeDashboard/storeProductos/nuevo-rubro/nuevo-rubro.component';

import { StoreLdPComponent } from './components/store/storeDashboard/store-ld-p/store-ld-p.component';
import { ListarLdPComponent } from './components/store/storeDashboard/storeLdP/listar-ld-p/listar-ld-p.component';
import { EditarLdPComponent } from './components/store/storeDashboard/storeLdP/editar-ld-p/editar-ld-p.component';
import { NuevaLdPComponent } from './components/store/storeDashboard/storeLdP/nueva-ld-p/nueva-ld-p.component';

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
    StoreLdPComponent,
    ListarLdPComponent,
    EditarLdPComponent,
    NuevaLdPComponent,
    StoreUsuariosComponent,
    StoreProductosComponent,
    ListarProductosComponent,
    EditarProductoComponent,
    NuevoProductoComponent,
    ListarRubrosComponent,
    EditarRubroComponent,
    NuevoRubroComponent,
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
    NuevoSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
