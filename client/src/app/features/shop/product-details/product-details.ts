import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';

@Component({
	selector: 'app-product-details',
	standalone: true,
	imports: [
		CurrencyPipe,
		MatButton,
		MatIcon,
		MatFormField,
		MatInput,
		MatLabel,
		MatDivider,
	],
	templateUrl: './product-details.html',
	styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
	private shopService = inject(ShopService);
	private activatedRoute = inject(ActivatedRoute);
	product = signal<Product | undefined>(undefined);
	// product?: Product;

	ngOnInit() {
		this.getProduct();
	}

	getProduct() {
		const id = this.activatedRoute.snapshot.paramMap.get('id');

		if (!id) return;

		this.shopService.getProduct(+id).subscribe({
			next: (res) => this.product.set(res),
			// next: (res) => {
			// 	this.product = res;
			// 	console.log(res);
			// },

			error: (err) => console.error(err),
		});
	}
}
