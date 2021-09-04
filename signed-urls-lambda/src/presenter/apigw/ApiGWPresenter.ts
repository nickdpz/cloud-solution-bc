import { MainPresenter } from "../MainPresenter";
import { HTTP_CODES } from "../../utils/Constants";
import { injectable } from "inversify";

@injectable()
export class ApiGWPresenter implements MainPresenter {
	generateOkResponse(): object {
		return {
			statusCode: HTTP_CODES.OK,
		};
	}
}
