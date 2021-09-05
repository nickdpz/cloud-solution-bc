import { MainController } from "../MainController";
import { inject, injectable } from "inversify";
import { MainService } from "../../service/MainService";
import { TYPES } from "../../utils/Constants";
import { APIGatewayEvent } from "aws-lambda";

@injectable()
export class ApiGWController implements MainController {
	constructor(@inject(TYPES.MainService) private service: MainService) {}

	async handleEvent(event: APIGatewayEvent): Promise<any> {
		const body = JSON.parse(event.body);
		return this.service.processData(body);
	}
}
