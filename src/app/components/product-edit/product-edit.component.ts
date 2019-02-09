import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { GlobalService } from '../../services/global.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: '../product-add/product-add.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
	public titulo: string;
	public producto: Product;
	public filesToUpload;
	public resultUpload;
	public is_edit;
	public url;
	public _id;
  constructor(
		private _productoService: ProductService,
		private _route: ActivatedRoute,
		private _global: GlobalService,
		private _router: Router
	){
		this.titulo = 'Editar producto';
		this.producto = new Product('','','','');
		this.is_edit = true;
		this.url = this._global.url;
	}

	ngOnInit(){
		console.log(this.titulo);
		this.getProducto();
	}

	onSubmit(){
		Swal.fire({
			showCancelButton: false,
			showConfirmButton: false,
			html: '<div class = "animated fadeIn fa-child-ss"><i class="fas fa-spinner fa-spin fa-2x"></i></div>',
			allowOutsideClick: false
		  });
		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._productoService.makeFileRequest(this.url + 'upload-image-product/' + this._id, [], this.filesToUpload, 'image').then((result) => {
				this.resultUpload = result;
				this.producto.image = this.resultUpload.filename;
				this.updateProducto();	
			}, (error) => {
				console.log(error);
			});
		}else{
			this.updateProducto();	
		}

	}

	updateProducto(){
		
		this._productoService.editProducto(this._id, this.producto).subscribe(
			response => {
				if(response['product']){
					Swal.close();
					this._router.navigate(['/product-detail', this._id]);
				}else{
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
		
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

	getProducto(){
		this._route.params.forEach((params: Params) => {
			this._id = params['id'];

			this._productoService.getProducto(this._id).subscribe(
				response => {
					console.log(response['product']);
					if(response['product']){
						this.producto = response['product'];
					}else{
						this._router.navigate(['/productos']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

}
