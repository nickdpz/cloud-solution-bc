import { ResponseApiGWModel } from "../models/ResponseApiGWModel";
export interface MainPresenter {
	generateOkResponse(body?: any): ResponseApiGWModel;
	generateInternalErrorResponse(message: string): ResponseApiGWModel;
	generateErrorRequestResponse(message: string): ResponseApiGWModel;
}
