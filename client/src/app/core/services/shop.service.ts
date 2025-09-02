import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ShopService {
	private readonly http = inject(HttpClient);
	private baseUrl = environment.apiUrl;
	types = signal<string[]>([]);
	brands = signal<string[]>([]);

	getProducts(brands?: string[], types?: string[]) {
		let params = new HttpParams();

		if (brands && brands.length > 0) {
			params = params.append('brands', brands.join(','));
		}

		if (types && types.length > 0) {
			params = params.append('types', types.join(','));
		}

		params = params.append('pageSize', 20);

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
