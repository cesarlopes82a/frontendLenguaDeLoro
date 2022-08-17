import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url:string;

  constructor(
    private _http:HttpClient,
  ) {
    this.url = global.url
  }

  getCategories(){
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url + '/stores/',{headers:headers})
    return this._http.get(this.url + '/categories/')  
     
  }

  getCategoriasByStoreId(storeId: string): Observable<any>{
    return this._http.get(this.url + '/categories/store/'+storeId)
  }

  createNewCategory(storeId: string, categoryName: string): Observable<any>{
    
    let params = JSON.stringify({ storeId: storeId, 
                                  categoryName: categoryName
                                })
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/categories/createNewCategory',params,{headers});
  }

  deleteCategoria(storeId:string, categoriaId:string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let data = JSON.stringify({ storeId: storeId, 
      categoriaId: categoriaId
    })
    const params = new HttpParams().append('param', data);

    return this._http.delete(this.url+'/categories/eliminarCategoria/',{headers:headers, params});

  }
}
