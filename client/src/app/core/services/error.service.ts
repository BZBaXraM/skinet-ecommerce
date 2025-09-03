import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	baseUrl = environment.apiUrl;
	private http = inject(HttpClient);

	get404Error() {
		return this.http.get(`${this.baseUrl}buggy/notfound`);
	}

	get401Error() {
		return this.http.get(`${this.baseUrl}buggy/unauthorized`);
	}

	get400Error() {
		return this.http.get(`${this.baseUrl}buggy/badrequest`);
	}

	get500Error() {
		return this.http.get(`${this.baseUrl}buggy/internalerror`);
	}

	get400ValidationError() {
		return this.http.post(`${this.baseUrl}buggy/validationerror`, {});
	}
}
