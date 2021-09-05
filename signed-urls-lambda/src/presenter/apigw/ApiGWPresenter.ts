import { MainPresenter } from "../MainPresenter";
import { HTTP_CODES } from "../../utils/Constants";
import { ResponseApiGW, ResponseApiGWModel } from "../../models/ResponseApiGWModel";
import { injectable } from "inversify";

@injectable()
export class ApiGWPresenter implements MainPresenter {
	generateOkResponse(body = {}): ResponseApiGWModel {
		return new ResponseApiGW(HTTP_CODES.OK, {
			result: "success",
			...body,
		});
	}
	generateErrorRequestResponse(message: string): ResponseApiGWModel {
		return new ResponseApiGW(HTTP_CODES.ERROR_REQUEST, { result: "fail", message });
	}
	generateInternalErrorResponse(message: string): ResponseApiGWModel {
		return new ResponseApiGW(HTTP_CODES.ERROR_INTERNAL, { result: "fail", message });
	}
}
