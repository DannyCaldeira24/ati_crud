import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { GlobalService } from '../../services/global.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

	public title: string;
  public products: Product[];
  public url;
	constructor(
		private _route:ActivatedRoute,
    private _router: Router,
    private _global:GlobalService,
		private _productService: ProductService
	){
    this.url=this._global.url;
		this.title = 'Listado de productos';
	}
	ngOnInit(){
		console.log('Se ha cargado el componente products-list.component.ts');
    this.getProductos();
	}

	getProductos(){
		this._productService.getProductos().subscribe(
			result => {
				if(!result['products']){
					console.log(result);
				}else{
          this.products = result['products']; 
				}
			},
			error =>{
				console.log(<any> error);
			}
		);	
	}

	deleteConfirm(id,name){
		Swal.fire({
			title: 'Estas seguro?',
			text: "Estas a punto de eliminar al producto " + name,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar'
		}).then((result) => {
			if (result.value) {
				this.onDeleteProducto(id);
			}
		})
	}

	onDeleteProducto(id){
		this._productService.deleteProducto(id).subscribe(
			response => {
				if(response['product']){
          this.getProductos();
          Swal.fire(
            'Producto eliminado!',
            'El producto ' + name + " ha sido eliminado",
            'success'
          )
				}else{
					alert('Error al borrar el producto');
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}

}
