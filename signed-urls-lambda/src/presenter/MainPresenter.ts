import { ResponseApiGatewayModel } from "../models/ResponseApiGWModel"
export interface MainPresenter {
	generateOkResponse(): ResponseApiGatewayModel;
}
