import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { GlobalService } from './global.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

@Injectable()
export class ProductService {
	public url: string;

	constructor(
		private _http: HttpClient,
		private _global: GlobalService
	) {
		this.url = this._global.url;
	}

	getProductos() {
		return this._http.get(this.url + 'products');
	}

	getProducto(id) {
		return this._http.get(this.url + 'product/' + id);
	}

	addProducto(producto: Product) {
		let params = JSON.stringify(producto);
		return this._http.post(this.url + 'product',params, httpOptions);
	}

	editProducto(id, producto: Product) {
		let params = JSON.stringify(producto);
		return this._http.post(this.url + 'update-product/' + id,params, httpOptions);
	}

	deleteProducto(id) {
		return this._http.delete(this.url + 'product/' + id, httpOptions);
	}

	makeFileRequest(url:string, params:Array<string>, files: Array<File>, name:string){
		return new Promise((resolve, reject) => {
	        let formData: any = new FormData()
	        let xhr = new XMLHttpRequest()
	        for (let file of files) {
	            formData.append(name, file, file.name);
	        }
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                    resolve(JSON.parse(xhr.response));
	                } else {
	                    reject(xhr.response);
	                }
	            }
	        }
	        xhr.open("POST", url, true);
	        xhr.send(formData);
	    });
	}

}
