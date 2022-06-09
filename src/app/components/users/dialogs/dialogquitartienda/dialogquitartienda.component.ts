import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-dialogquitartienda',
  templateUrl: './dialogquitartienda.component.html',
  styleUrls: ['./dialogquitartienda.component.css']
})
export class DialogquitartiendaComponent implements OnInit {

  checkStatus = this._formBuilder.group({});

  constructor(
    public dialogRef: MatDialogRef<DialogquitartiendaComponent>,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {}

  ngOnInit(): void {
    console.log("recibo esto..........")
    console.log(this.data)
    this.formBuilderGroupInitialStatus(this.data.adminMasterTiendas)

  }
  formBuilderGroupInitialStatus(adminMasterTiendas:any){
    var tiendaInitialStatus= {}

    adminMasterTiendas.forEach((adminMasterTienda:any)=>{         //recorro el array de tiendas del adminMaster
      adminMasterTienda.branches.forEach((storeBranch:any)=>{     //recorro el array de branches de CADA tienda asociada

        //busco esta STORE en las TIENDAS del USER   
        let encontreLaBranchEnElUser = false     
        this.data.usrSelecionado.tiendas.every((userTienda:any)=>{    //Recorro el array de tiendas del USER
          if(adminMasterTienda.store._id == userTienda.store._id){        // COINCIDENCIA DE STORE USER Y ADMIN MASTER
            console.log("encontre la store... " )
            console.log(userTienda.store.storeName)
            //TENGO QUE BUSCAR LAS BRANCHES
            userTienda.branches.every((userBranch:any)=>{   //recorro el array de branches del USER
              console.log(storeBranch._id +" - "+ userBranch._id)
              if(storeBranch._id == userBranch._id){                      // Coincidencia de la branch del user con la del admin master
                console.log("coincidencia!")
                encontreLaBranchEnElUser = true
                return false
              }
              return true
            })            
            return false
          }
          return true
        })
        // valur: encontreLaBranchEnElUser me dice si va a estar tildado o no en la interfaz
        Object.defineProperty(tiendaInitialStatus, storeBranch._id, {value: encontreLaBranchEnElUser, writable:true,enumerable:true, configurable:true})  

      })      
    })
    this.checkStatus = this._formBuilder.group(tiendaInitialStatus)
  }

  enviarSeleccion(){
    this._userService.enviarTiendasSeleccionadasAsignacion.emit({
      data: this.checkStatus.value
    })
  }

  checkTiendaStatus(indexTienda:number, branchId:string){
    const storeId = this.data.adminMasterTiendas[indexTienda].store._id
    setTimeout( () => {
      for (var key in this.checkStatus.value) {
        console.log("key::: " + key + " valor::: " + this.checkStatus.value[key] )
      }
      console.log(JSON.stringify(this.checkStatus.value, [branchId]));
      console.log(this.checkStatus.value[branchId])      
     }, 50);
  }
 



}

  

  