import { AfterViewInit, Component, ViewChild, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any   //aca recibo la info que me mandan al abrirl el dialog
  ) {
    
   }

  ngOnInit(): void {    
    this.listaDePreciosOriginal = this.data._productsList
    console.log(this.listaDePreciosOriginal)
    this.dataSource = new MatTableDataSource(this.listaDePreciosOriginal);
  }

  ngAfterViewInit() {
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
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  showSelectedData(){
    let selectedFileIds: string[] = [];
    for (let item of this.selection.selected) {
      console.log(item);
      selectedFileIds.push(item.fileId);
    }
    console.log("selectedFileIds")
    console.log(selectedFileIds)
  }
}
