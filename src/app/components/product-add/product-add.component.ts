import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { GlobalService } from '../../services/global.service';

import Swal from 'sweetalert2';

@Component({
	selector: 'app-product-add',
	templateUrl: './product-add.component.html',
	styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

	public titulo: string;
	public producto: Product;
	public filesToUpload;
	public resultUpload;
	public GLOBAL;
	public _id;
	constructor(
		private _productoService: ProductService,
		private _global: GlobalService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.titulo = 'Crear un nuevo producto';
		this.producto = new Product('', '', '', '');
		this.GLOBAL = this._global.url;
	}

	ngOnInit() {
	}

	onSubmit() {
		Swal.fire({
			showCancelButton: false,
			showConfirmButton: false,
			html: '<div class = "animated fadeIn fa-child-ss"><i class="fas fa-spinner fa-spin fa-2x"></i></div>',
			allowOutsideClick: false
		  });
		this._productoService.addProducto(this.producto).subscribe(
			response => {
				if(response['product']['_id']) {
					this._id = response['product']['_id'];
					if (this.filesToUpload && this.filesToUpload.length >= 1) {
						this._productoService.makeFileRequest(this.GLOBAL + 'upload-image-product/' + this._id, [], this.filesToUpload, 'image').then((result) => {
							this.resultUpload = result;
							this.producto.image = this.resultUpload.filename;
							this._productoService.editProducto(this._id, this.producto).subscribe(
								response => {
									console.log(response['product']);
									if (response['product']) {
										Swal.close();
										this._router.navigate(['/product-detail', this._id]);
									} else {
										console.log(response);
									}
								},
								error => {
									console.log(<any>error);
								}
							);
						}, (error) => {
							console.log(error);
						});
					}
					Swal.close();
					this._router.navigate(['/product-detail', this._id]);
				} else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);

	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
