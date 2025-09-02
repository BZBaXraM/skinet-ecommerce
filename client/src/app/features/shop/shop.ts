import { MatDialog } from '@angular/material/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product.model';
import { ProductItem } from '../product-item/product-item';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-shop',
	imports: [ProductItem, MatButton, MatIcon],
	templateUrl: './shop.html',
	styleUrl: './shop.scss',
})
export class Shop implements OnInit {
	private shopService = inject(ShopService);
	private dialogService = inject(MatDialog);
	products = signal<Product[] | []>([]);
	selectedBrands: string[] = [];
	selectedTypes: string[] = [];

	ngOnInit() {
		this.initializeShop();
	}

	initializeShop() {
		this.shopService.getBrands;
		this.shopService.getTypes;
		this.shopService.getProducts().subscribe({
			next: (response) => this.products.set(response.data),
		});
	}

	openFiltersDialog() {
		const dialogRef = this.dialogService.open(FiltersDialog, {
			minWidth: '500px',
			data: {
				selectedBrands: this.selectedBrands,
				selectedTypes: this.selectedTypes,
			},
		});
		dialogRef.afterClosed().subscribe({
			next: (res) => {
				if (res) {
					this.selectedBrands = res.selectedBrands;
					this.selectedTypes = res.selectedTypes;
					this.shopService
						.getProducts(this.selectedBrands, this.selectedTypes)
						.subscribe({
							next: (res) => this.products.set(res.data),
							error: (err) => console.error(err),
						});
				}
			},
		});
	}
}
