import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
  public quieroEliminarEsteUsuario!:string;
  public url!:string;
  public adminMasterTiendas!:any;
  public tiendasSeleccionadas: Array<any> = [];
  public estadoDeTiendas: Array<any>=[];   // es un array de todas las stores que tiene el adminMaster + un booleano asignada:true/false que me dice si el usuario ya la tiene asignada o no
  public usrAlQLQuieroAddTienda!:string
  

  constructor(
    private _userService:UserService,
    private _router: Router,
  ) {
    this.url = global.url,
    this.title = "U S U A R I O S"
  }

  
  ngOnInit(){

    console.log("-----------------voy a llamar al promise-------------------")
    const allUsersAndPopilate = Promise.resolve(this.getUsersAndPopulate());
    console.log("-----------------despues de llamarlo -------------------")
    allUsersAndPopilate.then((response)=>{
      console.log("lo que me devuelve el pomise..................")
      console.log(this.usuarios)

    })

  //  this.getUsersAndPopulate()
    console.log("######### Cargué los usuarios #########")
    console.log(this.usuarios)
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

  listarLasTiendas(usuarioId: any){

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
            console.log("adminMasterTienda numero: " + contador + " - " +adminMasterTienda.store._id)
            objTienda.store=adminMasterTienda.store
            objTienda.asignada = false
            
            //ahora voy a recorrer el las tiendas del usuario para hacer un mach 
            var contadorUsuario = 0
            usuario.tiendas.every((usuarioTienda:any)=>{
              contadorUsuario = contadorUsuario+1
              console.log("--- contadorUsuario: " + contadorUsuario)
              if(adminMasterTienda.store._id == usuarioTienda.store._id){
                //agrego la tienda al array de tiendas seleccionadas
                this.tiendasSeleccionadas.push(adminMasterTienda.store._id)
                objTienda.asignada= true
                return false
              }
              return true
            })
            console.log("push")
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
        this._router.navigate(['/usuarios']); 

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete del addStoreToUserFromRoute()') 
    })
  }

  testClick(){
    console.log("hice click en el boton")
  }


  pidoEliminar(idUsuario:string){
    this.quieroEliminarEsteUsuario=idUsuario;
    console.log("es este: " + this.quieroEliminarEsteUsuario)
  }
  consultoEstadoEliminar(idUsuario:string){
    if(idUsuario==this.quieroEliminarEsteUsuario) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteUsuario="";
  }

  async getUsersAndPopulate(){
    console.log("estoy en el getUsersAndPopulate(). voy a llamar a _userService.getUsersAndPopulate() ")
    this._userService.getUsersAndPopulate()
    .subscribe({
      next: (v) => {
        console.log("el next del _userService.getUsersAndPopulate()")
        console.log("muestro el V")
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
  deleteUsuario(idUsuario:string){
    console.log("intento eliminar el usuario")
  }
  

  async getUsers(){
    this._userService.getUsers()
    .subscribe({
      next: (v) => {
        console.log("estos son los usuarios")
        console.log(v)
        this.usuarios =  v
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }



}
