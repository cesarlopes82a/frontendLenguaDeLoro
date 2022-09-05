import { AfterViewInit, Component, ViewChild, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import { ListadepreciosService } from '../../../../../../services/listadeprecios.service'
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-dialogpreciomasivo',
  templateUrl: './dialogpreciomasivo.component.html',
  styleUrls: ['./dialogpreciomasivo.component.css']
})
export class DialogpreciomasivoComponent implements OnInit {

  public listaDePreciosOriginal: any
  public listaDePreciosModificada: [] = []
  displayedColumns: string[] = ['select', 'codigo', 'productName', 'rubro', 'fechaUltimaCompra', 'costoUnitario', 'precioVenta', 'stock'];
  public dataSource!: MatTableDataSource<any>;
  public selection = new SelectionModel<any>(true, []);
  public selectedFileIds: string[]=[]
  public confirmed = false
  public montoPorcentaje!: number
  public ajusteTipo!: string
  public porcentajeValido=false
  public title!:string

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _listadpSevice: ListadepreciosService,
    @Inject(MAT_DIALOG_DATA) public data: any   //aca recibo la info que me mandan al abrirl el dialog
  ) {
    
   }
   
  ngOnInit(): void {    
    this.listaDePreciosOriginal = this.data._productsList
    console.log(this.listaDePreciosOriginal)
    this.dataSource = new MatTableDataSource(this.listaDePreciosOriginal);
    if(this.data.valorDeReferencia == "precioVenta"){
      this.title = "Ajuste de precios en funcion de los PRECIO DE VENTA registrados."
    }else if(this.data.valorDeReferencia == "costo"){
      this.title = "Ajuste de precios en funcion del PRECIO DE COSTOS registrado."
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updatePaginatorAndSort(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    

    const numSelected = this.selection.selected.length;    
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear() ;
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  getPageData() {
    return this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData));
  }

  isEntirePageSelected() {
    return this.getPageData().every((row) => this.selection.isSelected(row));
  }

  masterToggle(checkboxChange: MatCheckboxChange) {
    this.isEntirePageSelected() ?
      this.selection.deselect(...this.getPageData()) :
      this.selection.select(...this.getPageData());
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isEntirePageSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  /** The label for the checkbox on the passed row */
  /*
  checkboxLabel(row?: any): string {    
    if (!row) {      
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
*/
  confirmSelectedData(){
    this.selectedFileIds.splice(0, this.selectedFileIds.length);
    for (let item of this.selection.selected) {
      //console.log(item);
      this.selectedFileIds.push(item);
    }
    this.confirmed = true
    console.log("selectedFileIds")
    console.log(this.selectedFileIds)

    this.setPorcentajeValido()
  }

  setConfirmationStatus(){
    const numSelected = this.selection.selected.length;
    if(this.selectedFileIds.length != numSelected){
      this.confirmed = false
    }
  }
  setConfirmationStatusFalse(){      
      this.confirmed = false
  }
  setPorcentajeValido(){
    if(this.montoPorcentaje <=0){
      this.porcentajeValido = false
    } else{
      this.porcentajeValido = true
    }
  }
  emitirSeleccion(){
    console.log("amitiendo...")
    this._listadpSevice.outputAjusteMasivoDePrecios.emit({
      data:this.selectedFileIds,
      ajusteTipo: this.ajusteTipo,
      montoPorcentaje: this.montoPorcentaje
    })
  }
  calcularPrecio(){

  }
}
