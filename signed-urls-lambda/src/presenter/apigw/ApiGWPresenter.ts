import { MainPresenter } from "../MainPresenter";
import { HTTP_CODES } from "../../utils/Constants";
import { ResponseApiGateway, ResponseApiGatewayModel } from "../../models/ResponseApiGWModel"
import { injectable } from "inversify";

@injectable()
export class ApiGWPresenter implements MainPresenter {
	generateOkResponse(): ResponseApiGatewayModel {
		return new ResponseApiGateway(HTTP_CODES.OK, {})
	}
}
