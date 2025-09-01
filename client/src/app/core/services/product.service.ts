import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private readonly http = inject(HttpClient);
	private baseUrl = environment.apiUrl;

	get getProducts() {
		return this.http.get<Pagination<Product>>(`${this.baseUrl}Products`);
	}
}
