import { Pagination } from './../../shared/models/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product.model';
import { ProductItem } from '../product-item/product-item';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
	MatListOption,
	MatSelectionList,
	MatSelectionListChange,
} from '@angular/material/list';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ShopParams } from '../../shared/models/shop.params';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-shop',
	imports: [
		ProductItem,
		MatButton,
		MatIcon,
		MatMenu,
		MatSelectionList,
		MatListOption,
		MatMenuTrigger,
		MatPaginator,
		FormsModule,
		MatIconButton,
	],
	templateUrl: './shop.html',
	styleUrl: './shop.scss',
})
export class Shop implements OnInit {
	private shopService = inject(ShopService);
	private dialogService = inject(MatDialog);
	products = signal<Pagination<Product> | undefined>(undefined);
	// products?: Pagination<Product>;
	sortOptions = [
		{ name: 'Alphabetical', value: 'name' },
		{ name: 'Price: Low-High', value: 'priceAsc' },
		{ name: 'Price: High-Low', value: 'priceDesc' },
	];
	shopParams = new ShopParams();

	ngOnInit() {
		this.initializeShop();
	}

	initializeShop() {
		this.shopService.getBrands;
		this.shopService.getTypes;
		this.getProducts();
	}

	getProducts() {
		this.shopService.getProducts(this.shopParams).subscribe({
			next: (response) => this.products.set(response),
		});
	}

	onSearchChange() {
		this.shopParams.pageNumber = 1;
		this.getProducts();
	}

	handlePageEvent(event: PageEvent) {
		this.shopParams.pageNumber = event.pageIndex + 1;
		this.shopParams.pageSize = event.pageSize;
		this.getProducts();
	}

	onSortChange(event: MatSelectionListChange) {
		const selectionOptions = event.options[0];
		if (selectionOptions) {
			this.shopParams.sort = selectionOptions.value;
			this.shopParams.pageNumber = 1;
			this.getProducts();
		}
	}

	openFiltersDialog() {
		const dialogRef = this.dialogService.open(FiltersDialog, {
			minWidth: '500px',
			data: {
				selectedBrands: this.shopParams.brands,
				selectedTypes: this.shopParams.types,
			},
		});
		dialogRef.afterClosed().subscribe({
			next: (res) => {
				if (res) {
					this.shopParams.brands = res.selectedBrands;
					this.shopParams.types = res.selectedTypes;
					this.shopParams.pageNumber = 1;
					this.getProducts();
				}
			},
		});
	}
}
