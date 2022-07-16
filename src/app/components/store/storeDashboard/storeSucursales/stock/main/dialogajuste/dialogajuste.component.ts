import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-dialogajuste',
  templateUrl: './dialogajuste.component.html',
  styleUrls: ['./dialogajuste.component.css']
})
export class DialogajusteComponent implements OnInit {
  public branchId!:string
  public productId!:string
  public productName!: string
  public cantidad!: number
  public nuevaCantidad!: number
  public descripcionAjuste!:string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogajusteComponent>,
    private _branchService: BranchService,
  ) { }

  ngOnInit(): void {
    console.log("recibo data")
    console.log(this.data.prodSeleccionado)
    console.log(this.data.branchId)
    this.productId = this.data.prodSeleccionado.prodId
    this.productName = this.data.prodSeleccionado.productName
    this.cantidad = this.data.prodSeleccionado.cantidad
    this.branchId = this.data.branchId
  }
  actualizarStock(){
    console.log("MENSAJE: actualizarStock() - Iniciando poceso" )
    this._branchService.ajustarStock(this.branchId, this.productId, this.cantidad, this.nuevaCantidad, this.descripcionAjuste)
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: actualizarStock() - Proceso finalizado exitosamente!")
      },
      error: (e) => console.error(e),
      complete: () => {
        this.closeDialog(this.nuevaCantidad)
      }
    })
    
  }
  closeDialog(nuevaCantidad:number) {
    this.dialogRef.close(nuevaCantidad);
  }
  

}
