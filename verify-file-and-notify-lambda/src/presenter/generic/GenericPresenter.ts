import { MainPresenter } from "../MainPresenter";
import { HTTP_CODES } from "../../utils/Constants";
import { ResponseGenericModel } from "../../models/ResponseGenericModel";
import { injectable } from "inversify";

@injectable()
export class GenericPresenter implements MainPresenter {
	generateOkResponse(body = {}): ResponseGenericModel {
		return {
			statusCode: HTTP_CODES.OK,
			responseBody: body,
		};
	}
	generateInternalErrorResponse(responseBody: any): ResponseGenericModel {
		return { statusCode: HTTP_CODES.ERROR_INTERNAL, responseBody };
	}
}
