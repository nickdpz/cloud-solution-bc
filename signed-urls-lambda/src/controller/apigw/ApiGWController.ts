import { MainController } from "../MainController";
import { inject, injectable } from "inversify";
import { MainService } from "../../service/MainService";
import { TYPES } from "../../utils/Constants";

@injectable()
export class ApiGWController implements MainController {
	constructor(@inject(TYPES.MainService) private service: MainService) {}

	async handleEvent(event: any): Promise<void> {
		this.service.processData(event);
	}
}
