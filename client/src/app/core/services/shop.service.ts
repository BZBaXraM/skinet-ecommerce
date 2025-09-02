import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment.development';
import { ShopParams } from '../../shared/models/shop.params';

@Injectable({
	providedIn: 'root',
})
export class ShopService {
	private readonly http = inject(HttpClient);
	private baseUrl = environment.apiUrl;
	types = signal<string[]>([]);
	brands = signal<string[]>([]);

	getProducts(shopParams: ShopParams) {
		let params = new HttpParams();

		if (shopParams.brands && shopParams.brands.length > 0) {
			params = params.append('Brand', shopParams.brands.join(','));
		}

		if (shopParams.sort) {
			params = params.append('sort', shopParams.sort);
		}

		if (shopParams.types && shopParams.types.length > 0) {
			params = params.append('Type', shopParams.types.join(','));
		}

		if (shopParams.search) {
			params = params.append('search', shopParams.search);
		}

		params = params.append('pageSize', shopParams.pageSize);
		params = params.append('pageIndex', shopParams.pageNumber);

		return this.http.get<Pagination<Product>>(`${this.baseUrl}Products`, {
			params,
		});
	}

	get getBrands() {
		if (this.brands().length > 0) return;
		return this.http
			.get<string[]>(`${this.baseUrl}Products/brands`)
			.subscribe({
				next: (res) => this.brands.set(res),
			});
	}

	get getTypes() {
		if (this.types().length > 0) return;
		return this.http
			.get<string[]>(`${this.baseUrl}Products/types`)
			.subscribe({
				next: (res) => this.types.set(res),
			});
	}
}
