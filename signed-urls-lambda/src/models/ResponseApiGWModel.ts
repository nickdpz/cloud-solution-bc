export interface ResponseApiGWModel {
	statusCode: number;
	headers: any;
	body: string;
}

export class ResponseApiGW implements ResponseApiGWModel {
	statusCode: number;
	body: string;
	headers: any;
	constructor(statusCode: number, body: any, headers?: any) {
		this.statusCode = statusCode;
		this.body = JSON.stringify(body);
		this.headers = headers ?? {
			"Content-Type": "application/json",
		};
	}
}
