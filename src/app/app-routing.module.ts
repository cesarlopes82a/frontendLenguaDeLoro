import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { GlobalComponent } from './components/global/global.component';
import { PrivateComponent } from './components/private/private.component';
import { CreateStoreComponent } from './components/store/create-store/create-store.component';

import { StoreDashboardComponent } from './components/store/storeDashboard/storeDashboard.component';
import { StoreUsuariosComponent } from './components/store/storeDashboard/store-usuarios/store-usuarios.component';
import { StoreProductosComponent } from './components/store/storeDashboard/store-productos/store-productos.component';
import { NuevoProductoComponent } from './components/store/storeDashboard/storeProductos/nuevo-producto/nuevo-producto.component'
import { EditarProductov2Component } from './components/store/storeDashboard/storeProductos/editar-productov2/editar-productov2.component'

import { StoreSucursalesComponent } from './components/store/storeDashboard/store-sucursales/store-sucursales.component';

import { ListarVendedoresComponent } from './components/store/storeDashboard/storeSucursales/listar-vendedores/listar-vendedores.component';
import { NuevoVendedorComponent } from './components/store/storeDashboard/storeSucursales/nuevo-vendedor/nuevo-vendedor.component'

import { NuevaSucComponent } from './components/store/storeDashboard/storeSucursales/nueva-suc/nueva-suc.component';

import { UsersComponent } from './components/users/users.component';
//este va por fuera del dashboard
import { NuevoUsuarioGlobalComponent } from './components/users/nuevo-usuario/nuevo-usuario.component';
//este va por dentro del dashboard
import { NuevoUsuarioComponent } from './components/store/storeDashboard/storeUsuarios/nuevo-usuario/nuevo-usuario.component';

import { EstadisticasGlobalComponent } from './components/statistics/estadisticas/estadisticas.component';

import { SupplierComponent } from './components/supplier/supplier.component';
import { NuevoSupplierComponent } from './components/supplier/nuevo-supplier/nuevo-supplier.component';

import { ComprasComponent } from './components/store/storeDashboard/storeSucursales/compras/main/compras/compras.component';
import { RegistrarCompraComponent } from './components/store/storeDashboard/storeSucursales/compras/new/registrar-compra/registrar-compra.component';

import { StockComponent } from './components/store/storeDashboard/storeSucursales/stock/main/stock/stock.component';

import { VentasComponent } from './components/store/storeDashboard/storeSucursales/ventas/main/ventas/ventas.component';
import { ListarventasComponent } from './components/store/storeDashboard/storeSucursales/ventas/listar/listarventas/listarventas.component';
import { VenderComponent } from './components/store/storeDashboard/storeSucursales/ventas/new/vender/vender.component';

import { LDPmainComponent } from './components/store/storeDashboard/storeLdP/main/ldpmain/ldpmain.component';
import { NewldpComponent } from './components/store/storeDashboard/storeLdP/new/newldp/newldp.component';

import { BranchLDPmainComponent } from './components/store/storeDashboard/storeSucursales/branchLdP/main/branch-ldpmain/branch-ldpmain.component';
import { NewBranchLDPComponent } from './components/store/storeDashboard/storeSucursales/branchLdP/new/new-branch-ldp/new-branch-ldp.component';

import { EstadistSucursalComponent } from './components/store/storeDashboard/storeSucursales/estadisticas/main/estadist-sucursal/estadist-sucursal.component';
import { EstadistTiendaComponent } from './components/store/storeDashboard/storeEstadisticas/estadisticas/main/estadist-tienda/estadist-tienda.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/private',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'private', component: PrivateComponent, canActivate:[AuthGuard] },
  { path: 'signup', component:SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'tienda/crearTienda', component: CreateStoreComponent },
  { path: 'tienda/:id', component: StoreDashboardComponent },
  { path: 'tienda/:id/usuarios', component: StoreUsuariosComponent },
  { path: 'tienda/:id/usuarios/crearUsuario', component: NuevoUsuarioComponent },
  { path: 'tienda/:id/productos', component: StoreProductosComponent },
  { path: 'tienda/:id/productos/nuevoProducto', component: NuevoProductoComponent },
  { path: 'tienda/:sid/productos/editarProducto/:id', component: EditarProductov2Component },
  { path: 'tienda/:id/ldp', component: LDPmainComponent },
  { path: 'tienda/:id/ldp/nuevaldp', component: NewldpComponent },
  { path: 'tienda/:id/sucursales', component: StoreSucursalesComponent },
  { path: 'tienda/:id/sucursales/crearSucursal', component: NuevaSucComponent },
  { path: 'tienda/:id/estadisticas', component: EstadistTiendaComponent},
  
  { path: 'sucursal/:id', component: StoreDashboardComponent },
  { path: 'sucursal/:id/usuarios', component: ListarVendedoresComponent },
  { path: 'sucursal/:id/usuarios/crearVendedor', component: NuevoVendedorComponent },
  
  { path: 'sucursal/:id/compras', component: ComprasComponent },
  { path: 'sucursal/:id/compras/registrarCompra', component: RegistrarCompraComponent },
  
  { path: 'sucursal/:id/ldp', component: BranchLDPmainComponent },
  { path: 'sucursal/:id/ldp/nuevaldp', component: NewBranchLDPComponent },

  { path: 'sucursal/:id/ventas', component: VentasComponent },
  { path: 'sucursal/:id/ventas/listar', component: ListarventasComponent },
  { path: 'sucursal/:id/ventas/vender', component: VenderComponent },

  { path: 'sucursal/:id/stock', component: StockComponent },
  
  { path: 'sucursal/:id/estadisticas', component: EstadistSucursalComponent },

  { path: 'estadisticas', component: EstadisticasGlobalComponent },

  { path: 'usuarios', component: UsersComponent },
  { path: 'usuarios/crearUsuario', component: NuevoUsuarioGlobalComponent },

  { path: 'proveedores', component: SupplierComponent },
  { path: 'proveedores/crearProveedor', component: NuevoSupplierComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
