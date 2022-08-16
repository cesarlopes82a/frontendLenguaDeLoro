import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogquitartiendaComponent } from './dialogs/dialogquitartienda/dialogquitartienda.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ],
})
export class UsersComponent implements OnInit {
  public title: string;
  public usuarios!: any;
  public usuariosPopulated!: any;
  public url!:string;
  public adminMasterTiendas!:any;
  public usrSelecionado!:any
  public tiendasSeleccionadas: Array<any> = [];
  public estadoDeTiendas: Array<any>=[];   // es un array de todas las stores que tiene el adminMaster + un booleano asignada:true/false que me dice si el usuario ya la tiene asignada o no
  public usrAlQLQuieroAddTienda!:string
  

  constructor(
    private _userService:UserService,
    private _router: Router,
    private dialog: MatDialog,
  ) {
    this.url = global.url,
    this.title = "U S U A R I O S"
  }

  
  ngOnInit(){
    this._userService.enviarTiendasSeleccionadasAsignacion.subscribe( data => {
      console.log("MENSAJE: enviarTiendasSeleccionadasAsignacion - reciendo la lista de tiendas seleccionadas para asignacion de tiendas.")
      for (const branch in data.data) {
        console.log(`${branch}: ${data.data[branch]}`);
        if(`${data.data[branch]}` == "true"){
            console.log("Tengo que asignar esta tienda: " + `${branch}`)
        }else{
          console.log("esta tienda NO: " + `${branch}`)
        }
      }
      this.reasignarTiendas(data.data, this.usrSelecionado._id)

      
    })
    // busco todos los usuarios para poder cargar la tabla de usuarios
    this.getUsersAndPopulate()    
  }
  async getUsersAndPopulate(){
    console.log("MENSAJE: Obteniendo lista de usuarios...")
    await this._userService.getUsersAndPopulate()
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: Lista de usuarios obtenida con exito")
        console.log(v)
        this.usuarios =  v
        this.usuarios.forEach((usuario: any) => {
          console.log("el rol")
          usuario.roles.forEach((role: any) => {
            console.log(role.roleName)  
          });
        });
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }

  
  onChange(tiendaId:string, isChecked: boolean) {
    if(isChecked) {
      console.log("agrego la tienda " + tiendaId + " al array de tiendas seleccionadassss desde le onChange()" )
      this.tiendasSeleccionadas.push(tiendaId);
    } else {
      let index = this.tiendasSeleccionadas.indexOf(tiendaId);
      this.tiendasSeleccionadas.splice(index,1);
    }
  }
  openDialogAsignacionDeTiendas(usuarioId:string){
    // al dialog le tengo que pasar lo diguiente:
    //  - las tiendas del adminMaster. Lo voy a usar como referencia de todas las tiendas y sus branches que hay actualemtente
    //  - el user a que quiero agregarle/quitarle una tienda o una branch
    
    //Localizo al admin Master
    this.usuarios.every((usuario: any) =>{
      if(usuario.roles[0].roleName === 'adminMaster'){
        this.adminMasterTiendas = usuario.tiendas
        return false
      }
      return true
    });
    ////////////////////////////////////

    //Localizo el usuario que quiero modificar
    this.usuarios.every((usuario: any) =>{
      if(usuario._id === usuarioId){
        this.usrSelecionado = usuario
        return false
      }
      return true
    });
    ////////////////////////////////////

   // this.listarLasTiendas(usuarioId,"quitar")
    const dialogRef = this.dialog.open(DialogquitartiendaComponent,{
      width:'50%',
      height:'50%',
      data:{
        'usrSelecionado':this.usrSelecionado,
        'adminMasterTiendas':this.adminMasterTiendas,
        
      }  
    }); 
   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);      
    });
  }

  reasignarTiendas(listaTiendasSeleccionadas: any, userId:string){    
    this._userService.reasignarTiendas(listaTiendasSeleccionadas, userId)
    .subscribe({
      next: (v) => {
     
        console.log(v)   
        this.getUsersAndPopulate() 
        this._router.navigate(['/usuarios']); 

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete del addStoreToUserFromRoute()') 
    })

  }
  

  listarLasTiendas(usuarioId: any, accion:string){

    this.usrAlQLQuieroAddTienda = usuarioId

    //vacio el array de estadoDeTiendas
    this.estadoDeTiendas.splice(0, this.estadoDeTiendas.length);

    //vacio el array de tiendasSeleccionadas
    this.tiendasSeleccionadas.splice(0, this.tiendasSeleccionadas.length);
 
    //voy a buscar el adminMaster para obtener el listado de todas las tiendas.
    this.usuarios.every((usuario: any) =>{
      if(usuario.roles[0].roleName === 'adminMaster'){
        this.adminMasterTiendas = usuario.tiendas
        return false
      }
      return true
    });

    //voy a buscar el usuario por el id que me pasan y lleno el array de tiendasAsignadas a este usuario
    this.usuarios.every((usuario: any) =>{  //uso el every en lugar del forEach para poder salir (return=false) una vez que encuentro el usuario._id
     //voy a llenar el array tiendasAsignadas con objetos de tipo objTienda
      if(usuario._id == usuarioId){
        if(usuario.tiendas.length>0){  // <-- esto me dice si el usuario tiene alguna tienda asignada o no tiene ninguna. si es =0 meto todas las tiendas con el parametro asignadas=false
          //reviso todas las tiendas que tiene para saber si el estado de objTienda.asignada va a ser true o false
          var contador=0
          this.adminMasterTiendas.forEach((adminMasterTienda:any)=>{
            //inicializo un objeto tienda para tenerlo precargado
            let objTienda = {
              'store': "",
              'asignada': false
            }
            contador=contador+1
            objTienda.store=adminMasterTienda.store
            objTienda.asignada = false
            
            //ahora voy a recorrer el las tiendas del usuario para hacer un mach 
            var contadorUsuario = 0
            usuario.tiendas.every((usuarioTienda:any)=>{
              contadorUsuario = contadorUsuario+1
              if(adminMasterTienda.store._id == usuarioTienda.store._id){
                //agrego la tienda al array de tiendas seleccionadas
                this.tiendasSeleccionadas.push(adminMasterTienda.store._id)
                objTienda.asignada= true
                return false
              }
              return true
            })
            this.estadoDeTiendas.push(objTienda)
          })
        }else{
          //meto todas las tiendas con el parametro asignadas=false
          this.adminMasterTiendas.forEach((tienda:any)=>{
            let objTienda = {
              'store': "",
              'asignada': false
            }
            objTienda.store=tienda.store
            objTienda.asignada=false
            this.estadoDeTiendas.push(objTienda)
          })
          console.log(this.adminMasterTiendas)
          console.log(this.estadoDeTiendas)
        }
        return false
      }
      return true
    });
    console.log("estas son las tiendasAsignadas FINALLLLLLL")
    console.log(this.estadoDeTiendas)
    
  }

  onCheckChange(event: any){
    //console.log("elvenettttt ", event)
    if(event.target.checked){
      //console.log("agrego la tienda al array de tiendas seleccionadas " + event.target.id + " desde el onCheckChange()")
      //console.log("este es el array de tiendasSeleccionadas antes de hacer el push")
      //console.log(this.tiendasSeleccionadas)
      this.tiendasSeleccionadas.push(event.target.id);
      console.log("este es el array de tiendasSeleccionadas DESPUES del push")
      console.log(this.tiendasSeleccionadas)
    } else {
      //console.log("SACO la tienda al array de tiendas seleccionadas " + event.target.id + " desde el onCheckChange()")
      //console.log("este es el array de tiendasSeleccionadas antes de hacer el splice")
      //console.log(this.tiendasSeleccionadas)
      let index = this.tiendasSeleccionadas.indexOf(event.target.id);
      this.tiendasSeleccionadas.splice(index,1);
      console.log("este es el array de tiendasSeleccionadas DESPUES de hacer el splice")
      console.log(this.tiendasSeleccionadas)
    }
  }
  guardarSeleccion(){
    console.log("GUARDO!")
    console.log(this.tiendasSeleccionadas)
    this.tiendasSeleccionadas.forEach((tiendasSeleccionada:any)=>{
      console.log("intentando asignar la tienda " + tiendasSeleccionada + " al user " + this.usrAlQLQuieroAddTienda )
      this.addStoreToUserFromRoute(this.usrAlQLQuieroAddTienda,tiendasSeleccionada)
      console.log("esta es una tienda seleccionada")
      console.log(tiendasSeleccionada)
    })
    
  }

  addStoreToUserFromRoute(userId:string, storeId:string){
    this._userService.addStoreToUserFromRoute(userId, storeId)
    .subscribe({
      next: (v) => {
        console.log("this._userService.addStoreToUserFromRoute(userId, storeId)")
        console.log("this._userService.addStoreToUserFromRoute("+userId+", "+storeId+")")
        console.log(v)   
        this.getUsersAndPopulate() 
        this._router.navigate(['/usuarios']); 

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete del addStoreToUserFromRoute()') 
    })
  }

  testClick(){
    console.log("hice click en el boton")
  }

  async getUsers(){
    this._userService.getUsers()
  }

  activarDesactivarCuenta(userId:string, accion: string){
    Swal.fire({
      title: accion + ' de cuenta.',
      text: "Esta accion requiere confirmacion para proceder!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this._userService.activarDesactivarCuenta(userId)
        .subscribe({
          next: (v) => {
            Swal.fire(
              accion + ' de cuenta.',
              'Proceso finalizado exitosamente!',
              'success'
            )

            //actualizo el frontend
            for (let i=0; i<this.usuarios.length; i++){
              if(String(this.usuarios[i]._id) == userId){
                this.usuarios[i].activated = v
              }
            }
          },
          error: (e) => {
            if(e.status == 403){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.error,
                //footer: '<a href="">Why do I have this issue?</a>'
              })
            } else{
            Swal.fire(
              accion + ' de cuenta.',
              'Ha ocurrido un error! ',              
              'error' 
            )
            }
            console.error(e)
          },
          complete: () => console.info('este es el complete') 
        })
      }
    })
  }

  changePassword(userId:string){
    Swal.fire({
      title: 'Ingrese el nuevo password',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar!',

      preConfirm: (login) => {

        this._userService.postChangePassword(userId,login)
        .subscribe({
          next: (v) => {
            Swal.fire(
              'Password:',
              'El password fue cambiado exitosamente!',
              'success'
            )
          },
          error: (e) => {
            if(e.status == 403){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.error,
                //footer: '<a href="">Why do I have this issue?</a>'
              })
            } else{
              Swal.fire(
                'Password:',
                'Ha ocurrido un error al intentar cambiar el password!',
                'error'
              )
            }
            console.error(e)
          },
          complete: () => console.info('este es el complete') 
        })

      },
      
    })
  }
  


}
