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
import { StoreLdPComponent } from './components/store/storeDashboard/store-ld-p/store-ld-p.component';
import { StoreSucursalesComponent } from './components/store/storeDashboard/store-sucursales/store-sucursales.component';

import { UsersComponent } from './components/users/users.component';

import { EstadisticasGlobalComponent } from './components/statistics/estadisticas/estadisticas.component';



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
  { path: 'crearTienda', component: CreateStoreComponent },
  { path: 'tienda/:id', component: StoreDashboardComponent },
  { path: 'tienda/:id/usuarios', component: StoreUsuariosComponent },
  { path: 'tienda/:id/productos', component: StoreProductosComponent },
  { path: 'tienda/:id/listadp', component: StoreLdPComponent },
  { path: 'tienda/:id/sucursales', component: StoreSucursalesComponent },
  
  { path: 'sucursal/:id', component: StoreDashboardComponent },

  { path: 'estadisticas', component: EstadisticasGlobalComponent },

  { path: 'usuarios', component: UsersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
