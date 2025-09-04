import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ErrorService } from '../../core/services/error.service';

@Component({
	selector: 'app-test-error',
	imports: [MatButton],
	templateUrl: './test-error.html',
	styleUrl: './test-error.scss',
})
export class TestError {
	private errorService = inject(ErrorService);
	validationErrors = signal<string[] | undefined>(undefined);

	get404Error() {
		this.errorService.get404Error().subscribe({
			next: (res) => console.log(res),
			error: (err) => console.log(err),
		});
	}

	get400Error() {
		this.errorService.get400Error().subscribe({
			next: (res) => console.log(res),
			error: (err) => console.log(err),
		});
	}

	get401Error() {
		this.errorService.get401Error().subscribe({
			next: (res) => console.log(res),
			error: (err) => console.log(err),
		});
	}

	get500Error() {
		this.errorService.get500Error().subscribe({
			next: (res) => console.log(res),
			error: (err) => console.log(err),
		});
	}

	get400ValidationError() {
		this.errorService.get400ValidationError().subscribe({
			next: (res) => console.log(res),
			error: (err) => this.validationErrors.set(err),
		});
	}
}
