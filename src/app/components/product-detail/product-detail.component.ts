import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

	public product;
	public url;
	constructor(
		private _productoService: ProductService,
		private _route: ActivatedRoute,
		private _global:GlobalService,
		private _router: Router
	){
		this.url=this._global.url;
	}

	ngOnInit(){
		this.getProducto();
	}

	getProducto(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.getProducto(id).subscribe(
				response => {
					if(response['product']){
						this.product=response['product'];
					}else{
						this._router.navigate(['/product-list']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

}
