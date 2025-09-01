import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Product } from './shared/models/product.model';
import { ProductService } from './core/services/product.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Header],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	productService = inject(ProductService);
	protected title = 'client';
	products = signal<Product[] | []>([]);

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts() {
		return this.productService.getProducts.subscribe({
			next: (response) => this.products.set(response.data),
		});
	}
}
