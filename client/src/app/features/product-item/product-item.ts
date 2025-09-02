import { Component, input } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-product-item',
	imports: [
		MatCard,
		MatCardContent,
		CurrencyPipe,
		MatCardActions,
		MatButton,
		MatIcon,
	],
	templateUrl: './product-item.html',
	styleUrl: './product-item.scss',
})
export class ProductItem {
	product = input<Product>();
}
